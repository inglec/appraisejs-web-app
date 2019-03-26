import { flatten, uniq } from 'lodash/array';
import { forEach, map, reduce } from 'lodash/collection';
import {
  get,
  mapValues,
  pick,
  set,
} from 'lodash/object';
import { createSelector } from 'reselect';

import { FETCHED } from 'appraisejs-utils/redux';

import { selectAuth, selectTests, selectTestIdsByRepository } from './state';

export const selectIsAuthenticated = createSelector(selectAuth, ({ token }) => !!token);

export const selectBenchmarkIdsByFilepath = createSelector(
  selectTests,
  selectTestIdsByRepository,
  (tests, testIdsByRepository) => (
    mapValues(testIdsByRepository, ({ data: testIds, status }) => {
      if (status === FETCHED && testIds) {
        return testIds.reduce((acc, testId) => {
          const { benchmarks, commitId } = tests[testId];
          const benchmarkIdsByFilepath = reduce(benchmarks, (tree, { filepath }, benchmarkId) => {
            const path = filepath.split('/');

            const directory = get(tree, path);
            if (directory) {
              directory.push(benchmarkId);
            } else {
              set(tree, path, [benchmarkId]);
            }
            return tree;
          }, {});
          acc[commitId] = benchmarkIdsByFilepath;

          return acc;
        }, {});
      }

      return null;
    })
  ),
);


export const selectBenchmarksByCommit = createSelector(
  selectTests,
  selectTestIdsByRepository,
  (tests, testIdsByRepository) => (
    mapValues(testIdsByRepository, ({ data: testIds, status }) => {
      if (status === FETCHED && testIds) {
        return reduce(testIds, (acc, testId) => {
          const { benchmarks, commitId } = tests[testId];
          const picked = mapValues(benchmarks, benchmark => (
            pick(benchmark, 'benchmarkDefinition', 'filepath')
          ));

          if (commitId in benchmarks) {
            acc[commitId] = [
              ...acc[commitId],
              ...picked,
            ];
          } else {
            acc[commitId] = picked;
          }

          return acc;
        }, {});
      }

      return null;
    })
  ),
);

export const selectBenchmarkIdsByRepository = createSelector(
  selectBenchmarksByCommit,
  benchmarksByCommit => (
    mapValues(benchmarksByCommit, (commits) => {
      if (!commits) {
        return null;
      }

      const benchmarkIds = flatten(map(commits, commit => Object.keys(commit)));
      return uniq(benchmarkIds);
    })
  ),
);

export const selectCommitIdsByBenchmark = createSelector(
  selectBenchmarksByCommit,
  benchmarksByCommit => (
    mapValues(benchmarksByCommit, commits => (
      commits
        ? reduce(commits, (acc, benchmarks, commitId) => {
          forEach(benchmarks, (benchmark, benchmarkId) => {
            if (benchmarkId in acc) {
              acc[benchmarkId].push(commitId);
            } else {
              acc[benchmarkId] = [commitId];
            }
          });

          return acc;
        }, {})
        : null
    ))
  ),
);

export const selectTestIdsByCommit = createSelector(
  selectTests,
  selectTestIdsByRepository,
  (tests, testIdsByRepository) => (
    mapValues(testIdsByRepository, ({ data: testIds, status }) => {
      if (status === FETCHED && testIds) {
        return testIds.reduce((acc, testId) => {
          const { commitId } = tests[testId];

          if (commitId in acc) {
            acc[commitId].push(testId);
          } else {
            acc[commitId] = [testId];
          }

          return acc;
        }, {});
      }

      return null;
    })
  ),
);

export const selectTestIdsByBenchmark = createSelector(
  selectBenchmarksByCommit,
  selectTestIdsByCommit,
  (benchmarksByCommit, testIdsByCommit) => (
    mapValues(benchmarksByCommit, (commits, repositoryId) => {
      if (!commits) {
        return null;
      }

      return reduce(commits, (acc, benchmarks, commitId) => {
        const testIds = testIdsByCommit[repositoryId][commitId];
        forEach(benchmarks, (benchmark, benchmarkId) => {
          if (benchmarkId in acc) {
            acc[benchmarkId] = [
              ...acc[benchmarkId],
              ...testIds,
            ];
          } else {
            acc[benchmarkId] = testIds;
          }
        });

        return acc;
      }, {});
    })
  ),
);
