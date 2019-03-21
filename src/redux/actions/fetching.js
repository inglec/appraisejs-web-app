import { pick } from 'lodash/object';

import { getInstallationRepos, getInstallations } from 'appraisejs-utils/github_api';
import { createAction } from 'appraisejs-utils/redux';
import { selectAuth } from 'appraisejs-redux/selectors';

// Action types
export const FETCH_INSTALLATIONS_FAILURE = 'FETCH_INSTALLATIONS_FAILURE';
export const FETCH_INSTALLATIONS_STARTED = 'FETCH_INSTALLATIONS_STARTED';
export const FETCH_INSTALLATIONS_SUCCESS = 'FETCH_INSTALLATIONS_SUCCESS';
export const FETCH_REPOSITORIES_FAILURE = 'FETCH_REPOSITORIES_FAILURE';
export const FETCH_REPOSITORIES_STARTED = 'FETCH_REPOSITORIES_STARTED';
export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';

export const fetchInstallations = () => {
  const failure = error => createAction(FETCH_INSTALLATIONS_FAILURE, { error });
  const success = installations => (
    createAction(FETCH_INSTALLATIONS_SUCCESS, { data: installations })
  );

  return (dispatch, getState) => {
    dispatch(createAction(FETCH_INSTALLATIONS_STARTED));

    const { token, tokenType } = selectAuth(getState());

    // Get the user's installations.
    getInstallations(tokenType, token)
      .then((response) => {
        const installations = response.data.installations.reduce((acc, installation) => {
          acc[installation.id] = pick(installation, ['account', 'app_id']);
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
  const success = repositories => createAction(FETCH_REPOSITORIES_SUCCESS, {
    key: installationId,
    data: repositories,
  });

  return (dispatch, getState) => {
    dispatch(createAction(FETCH_REPOSITORIES_STARTED));

    const { token, tokenType } = selectAuth(getState());

    // Get the repositories accessible by an installation.
    getInstallationRepos(tokenType, token, installationId)
      .then((response) => {
        const repositories = response.data.repositories.reduce((acc, repository) => {
          acc[repository.id] = pick(repository, [
            'description',
            'html_url',
            'name',
            'owner',
            'private',
            'updated_at',
          ]);

          return acc;
        }, {});

        dispatch(success(repositories));
      })
      .catch(error => dispatch(failure(error)));
  };
};
