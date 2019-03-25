import { forEach, reduce } from 'lodash/collection';
import { get, mapValues, set } from 'lodash/object';
import { createSelector } from 'reselect';

import { FETCHED } from 'appraisejs-utils/redux';

export const selectAuth = state => state.auth;
export const selectInstallations = state => state.installations;
export const selectRepositoriesByInstallation = state => state.repositoriesByInstallation;
export const selectRepositories = state => state.repositories;
export const selectTests = state => state.tests;
export const selectTestsByRepository = state => state.testsByRepository;
export const selectUser = state => state.user;

export const selectIsAuthenticated = createSelector(selectAuth, ({ token }) => !!token);

export const selectBenchmarksByFilepath = createSelector(
  selectTests,
  selectTestsByRepository,
  (tests, testsByRepository) => mapValues(testsByRepository, ({ data, status }) => {
    if (status === FETCHED && data) {
      return data.reduce((acc, testId) => {
        const { benchmarks, commitId } = tests[testId];
        const benchmarksByFilepath = reduce(benchmarks, (tree, { filepath }, benchmarkId) => {
          const path = filepath.split('/');

          const directory = get(tree, path);
          if (directory) {
            directory.push(benchmarkId);
          } else {
            set(tree, path, [benchmarkId]);
          }
          return tree;
        }, {});
        acc[commitId] = benchmarksByFilepath;

        return acc;
      }, {});
    }

    return null;
  }),
);

export const selectTestsByBenchmark = createSelector(
  selectTests,
  selectTestsByRepository,
  (tests, testsByRepository) => mapValues(testsByRepository, ({ data, status }) => {
    if (status === FETCHED && data) {
      return data.reduce((acc, testId) => {
        const { benchmarks, commitId } = tests[testId];

        forEach(benchmarks, ({ benchmarkDefinition, filepath }, benchmarkId) => {
          const path = [commitId, benchmarkId];
          const benchmarkAtPath = get(acc, path);
          if (benchmarkAtPath) {
            benchmarkAtPath.tests.push(testId);
          } else {
            set(acc, path, {
              benchmarkDefinition,
              filepath,
              tests: [testId],
            });
          }
        });

        return acc;
      }, {});
    }

    return null;
  }),
);
