import { pick } from 'lodash/object';

import { getInstallationRepos, getInstallations, getUser } from 'appraisejs-utils/github_api';
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
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_USER_STARTED = 'FETCH_USER_STARTED';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const fetchUser = () => {
  const failure = error => createAction(FETCH_USER_FAILURE, { error });
  const success = data => createAction(FETCH_USER_SUCCESS, { data });

  return (dispatch, getState) => {
    dispatch(createAction(FETCH_USER_STARTED));

    const { token, tokenType } = selectAuth(getState());

    getUser(tokenType, token)
      .then(({ data }) => {
        const user = toCamelCaseKeys(pick(data, 'avatar_url', 'html_url', 'id', 'login', 'name'));
        dispatch(success(user));
      })
      .catch(error => dispatch(failure(error)));
  };
};

export const fetchInstallations = () => {
  const failure = error => createAction(FETCH_INSTALLATIONS_FAILURE, { error });
  const success = data => createAction(FETCH_INSTALLATIONS_SUCCESS, { data });

  return (dispatch, getState) => {
    dispatch(createAction(FETCH_INSTALLATIONS_STARTED));

    const { token, tokenType } = selectAuth(getState());

    // Get the user's installations.
    getInstallations(tokenType, token)
      .then(({ data }) => {
        const installations = data.installations.reduce((acc, { account, app_id: appId, id }) => {
          acc[id] = {
            account: toCamelCaseKeys(pick(account, 'avatar_url', 'id', 'login', 'html_url')),
            appId,
          };
          return acc;
        }, {});

        dispatch(success(installations));
      })
      .catch(error => dispatch(failure(error)));
  };
};

export const fetchReposInInstallation = (installationId) => {
  const failure = error => createAction(FETCH_REPOSITORIES_FAILURE, {
    key: installationId,
    error,
  });
  const success = data => createAction(FETCH_REPOSITORIES_SUCCESS, {
    key: installationId,
    data,
  });

  return (dispatch, getState) => {
    dispatch(createAction(FETCH_REPOSITORIES_STARTED));

    const { token, tokenType } = selectAuth(getState());

    // Get the repositories accessible by an installation.
    getInstallationRepos(tokenType, token, installationId)
      .then(({ data }) => {
        const repositories = data.repositories.reduce((acc, repository) => {
          acc[repository.id] = toCamelCaseKeys(
            pick(repository, [
              'description',
              'html_url',
              'name',
              'owner',
              'private',
              'updated_at',
            ]),
          );

          return acc;
        }, {});

        dispatch(success(repositories));
      })
      .catch(error => dispatch(failure(error)));
  };
};
