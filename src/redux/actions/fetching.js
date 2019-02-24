import _ from 'lodash';

import { getInstallationRepos, getInstallations } from 'appraisejs-utils/github_api';
import { createAction } from 'appraisejs-utils/redux';
import { selectAuth } from 'appraisejs-redux/selectors';

// Action types.
export const FETCH_INSTALLATIONS_FAILURE = 'FETCH_INSTALLATIONS_FAILURE';
export const FETCH_INSTALLATIONS_STARTED = 'FETCH_INSTALLATIONS_STARTED';
export const FETCH_INSTALLATIONS_SUCCESS = 'FETCH_INSTALLATIONS_SUCCESS';
export const FETCH_REPOSITORIES_FAILURE = 'FETCH_REPOSITORIES_FAILURE';
export const FETCH_REPOSITORIES_STARTED = 'FETCH_REPOSITORIES_STARTED';
export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';

export const fetchInstallations = () => {
  const failure = error => createAction(FETCH_INSTALLATIONS_FAILURE, { message: error });
  const success = installations => (
    createAction(FETCH_INSTALLATIONS_SUCCESS, { data: installations })
  );

  return (dispatch, getState) => {
    dispatch(createAction(FETCH_INSTALLATIONS_STARTED));

    const { token, tokenType } = selectAuth(getState());

    // Get the user's installations.
    getInstallations(tokenType, token)
      .then((res) => {
        const obj = res.data.installations.reduce((acc, repository) => {
          acc[repository.id] = _.pick(repository, ['account', 'app_id']);
          return acc;
        }, {});

        dispatch(success(obj));
      })
      .catch(error => dispatch(failure(error)));
  };
};

export const fetchReposInInstallation = (installationId) => {
  const failure = error => createAction(FETCH_REPOSITORIES_FAILURE, { message: error });
  const success = repositories => createAction(FETCH_REPOSITORIES_SUCCESS, {
    data: repositories,
    key: installationId,
  });

  return (dispatch, getState) => {
    const state = getState();

    // Fetch installations if missing.
    if (_.isEmpty(state.installations)) {
      fetchInstallations()(dispatch, getState);
    }

    dispatch(createAction(FETCH_REPOSITORIES_STARTED));

    const { token, tokenType } = selectAuth(state);

    // Get the repositories accessible by an installation.
    getInstallationRepos(tokenType, token, installationId)
      .then((res) => {
        const obj = res.data.repositories.reduce((acc, repository) => {
          acc[repository.id] = _.pick(repository, [
            'description',
            'html_url',
            'name',
            'owner',
            'private',
            'updated_at',
          ]);

          return acc;
        }, {});

        dispatch(success(obj));
      })
      .catch(error => dispatch(failure(error)));
  };
};
