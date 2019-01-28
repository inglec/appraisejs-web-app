import axios from 'axios';
import _ from 'lodash';

import {
  GITHUB_API_URL,
  GITHUB_APPS_MEDIA_TYPE,
} from 'appraisejs-utils/github_api';
import { createAction } from 'appraisejs-utils/redux';

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

    // Get the user's installations.
    const { tokenType, token } = getState().authentication;
    axios
      .get(`${GITHUB_API_URL}/user/installations`, {
        headers: {
          'Accept': GITHUB_APPS_MEDIA_TYPE,
          'Authorization': `${tokenType} ${token}`
        }
      })
      .then((res) => {
        const obj = res.data.installations.reduce((acc, repository) => ({
          ...acc,
          [repository.id]: _.pick(repository, ['account', 'app_id']),
        }), {});

        dispatch(success(obj));
      })
      .catch(err => dispatch(failure(err)));
  }
};

export const fetchReposInInstallation = (installationId) => {
  const failure = error => createAction(FETCH_REPOSITORIES_FAILURE, { message: error });
  const success = repositories => createAction(FETCH_REPOSITORIES_SUCCESS, {
    data: repositories,
    key: installationId,
  });

  return (dispatch, getState) => {
    dispatch(createAction(FETCH_REPOSITORIES_STARTED));

    // Get the repositories accessible by an repository.
    const { tokenType, token } = getState().authentication;
    axios
      .get(`${GITHUB_API_URL}/user/installations/${installationId}/repositories`, {
        headers: {
          'Accept': GITHUB_APPS_MEDIA_TYPE,
          'Authorization': `${tokenType} ${token}`
        }
      })
      .then((res) => {
        const obj = res.data.repositories.reduce((acc, repository) => ({
          ...acc,
          [repository.id]: _.pick(
            repository,
            ['description', 'html_url', 'name', 'owner', 'private', 'updated_at'],
          ),
        }), {});

        dispatch(success(obj));
      })
      .catch(err => dispatch(failure(err)));
  }
};
