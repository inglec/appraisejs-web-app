import { pick } from 'lodash/object';

import { getInstallationRepos, getInstallations, getUser } from 'appraisejs-utils/github_api';
import { getRepositoryTests } from 'appraisejs-utils/appraisejs_api';
import { createAction } from 'appraisejs-utils/redux';
import { selectAuth } from 'appraisejs-redux/selectors';

import { toCamelCaseKeys } from 'appraisejs-utils/objects';

// Action types
export const FETCH_INSTALLATIONS_FAILURE = 'FETCH_INSTALLATIONS_FAILURE';
export const FETCH_INSTALLATIONS_STARTED = 'FETCH_INSTALLATIONS_STARTED';
export const FETCH_INSTALLATIONS_SUCCESS = 'FETCH_INSTALLATIONS_SUCCESS';
export const FETCH_REPOSITORIES_FAILURE = 'FETCH_REPOSITORIES_FAILURE';
export const FETCH_REPOSITORIES_STARTED = 'FETCH_REPOSITORIES_STARTED';
export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';
export const FETCH_TESTS_FAILURE = 'FETCH_TESTS_FAILURE';
export const FETCH_TESTS_STARTED = 'FETCH_TESTS_STARTED';
export const FETCH_TESTS_SUCCESS = 'FETCH_TESTS_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_USER_STARTED = 'FETCH_USER_STARTED';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

const pickOwnerFields = owner => toCamelCaseKeys(
  pick(owner, 'avatar_url', 'id', 'login', 'html_url'),
);

export const fetchUser = () => {
  const failure = error => createAction(FETCH_USER_FAILURE, { error: error.toString() });
  const success = data => createAction(FETCH_USER_SUCCESS, { data });

  return (dispatch, getState) => {
    const { token, tokenType } = selectAuth(getState());

    dispatch(createAction(FETCH_USER_STARTED));
    return getUser(tokenType, token)
      .then(({ data }) => {
        const user = toCamelCaseKeys(pick(data, 'avatar_url', 'html_url', 'id', 'login', 'name'));
        dispatch(success(user));
      })
      .catch(error => dispatch(failure(error)));
  };
};

export const fetchInstallations = () => {
  const failure = error => createAction(FETCH_INSTALLATIONS_FAILURE, { error: error.toString() });
  const success = data => createAction(FETCH_INSTALLATIONS_SUCCESS, { data });

  return (dispatch, getState) => {
    const { token, tokenType } = selectAuth(getState());

    // Get the user's installations.
    dispatch(createAction(FETCH_INSTALLATIONS_STARTED));
    return getInstallations(tokenType, token)
      .then(({ data }) => {
        const installations = data.installations.reduce((acc, { account, app_id: appId, id }) => {
          acc[id] = {
            account: pickOwnerFields(account),
            appId,
          };
          return acc;
        }, {});

        dispatch(success(installations));
      })
      .catch(error => dispatch(failure(error)));
  };
};

export const fetchRepositoryIdsByInstallation = (installationId) => {
  const failure = error => createAction(FETCH_REPOSITORIES_FAILURE, {
    key: installationId,
    error: error.toString(),
  });
  const success = data => createAction(FETCH_REPOSITORIES_SUCCESS, {
    key: installationId,
    data,
  });

  return (dispatch, getState) => {
    const { token, tokenType } = selectAuth(getState());

    // Get the repositories accessible by an installation
    dispatch(createAction(FETCH_REPOSITORIES_STARTED, { key: installationId }));
    return getInstallationRepos(tokenType, token, installationId)
      .then(({ data }) => {
        const repositories = data.repositories.reduce((acc, repository) => {
          const primitiveValues = toCamelCaseKeys(
            pick(repository, 'description', 'html_url', 'name', 'private'),
          );
          acc[repository.id] = {
            ...primitiveValues,
            owner: pickOwnerFields(repository.owner),
          };

          return acc;
        }, {});

        dispatch(success(repositories));
      })
      .catch(error => dispatch(failure(error)));
  };
};

export const fetchTestsInRepository = (repositoryId) => {
  const failure = error => createAction(FETCH_TESTS_FAILURE, {
    key: repositoryId,
    error: error.toString(),
  });
  const success = data => createAction(FETCH_TESTS_SUCCESS, {
    key: repositoryId,
    data,
  });

  return (dispatch) => {
    // Get test results for the passed repository
    dispatch(createAction(FETCH_TESTS_STARTED, { key: repositoryId }));
    return getRepositoryTests(repositoryId)
      .then(({ data }) => {
        const tests = data.reduce((acc, test) => {
          const {
            benchmarks,
            errs: testErrors,
            testId,
            ...rest
          } = test;

          acc[testId] = {
            benchmarks: benchmarks.reduce((innerAcc, benchmark) => {
              const {
                attempts,
                benchmarkId,
                errs: benchmarkErrors,
                ...benchmarkRest
              } = benchmark;

              // eslint-disable-next-line no-param-reassign
              innerAcc[benchmarkId] = {
                attempts: attempts.map(attempt => attempt.runs),
                errors: benchmarkErrors,
                ...benchmarkRest,
              };
              return innerAcc;
            }, {}),
            errors: testErrors.map(({ errs: stageErrors, stage }) => ({
              errors: stageErrors,
              stage,
            })),
            ...rest,
          };
          return acc;
        }, {});

        dispatch(success(tests));
      })
      .catch(error => dispatch(failure(error)));
  };
};
