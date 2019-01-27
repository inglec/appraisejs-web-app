import axios from 'axios';
import _ from 'lodash';

import {
  GITHUB_API_URL,
  GITHUB_APPS_MEDIA_TYPE,
} from 'appraisejs-utils/githubApi';
import { createAction } from 'appraisejs-utils/redux';

// Action types.
export const AUTHORISE = 'AUTHORISE';
export const FETCH_INSTALLATIONS_FAILURE = 'FETCH_INSTALLATIONS_FAILURE';
export const FETCH_INSTALLATIONS_STARTED = 'FETCH_INSTALLATIONS_STARTED';
export const FETCH_INSTALLATIONS_SUCCESS = 'FETCH_INSTALLATIONS_SUCCESS';
export const FETCH_REPOSITORIES_FAILURE = 'FETCH_REPOSITORIES_FAILURE';
export const FETCH_REPOSITORIES_STARTED = 'FETCH_REPOSITORIES_STARTED';
export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';
export const SELECT_BRANCH = 'SELECT_BRANCH';
export const SELECT_COMMIT = 'SELECT_COMMIT';
export const SELECT_INSTALLATION = 'SELECT_INSTALLATION';
export const SELECT_REPOSITORY = 'SELECT_REPOSITORY';

export const setAuthorisation = (tokenType, token) => {
  return createAction(AUTHORISE, {
    token,
    tokenType,
  });
};

export const clearAuthorisation = () => setAuthorisation(null, null);

export const fetchInstallations = () => {
  const failure = error => createAction(FETCH_INSTALLATIONS_FAILURE, { message: error });
  const success = installations => (
    createAction(FETCH_INSTALLATIONS_SUCCESS, { data: installations })
  );

  return (dispatch, getState) => {
    dispatch(createAction(FETCH_INSTALLATIONS_STARTED));

    // Get the user's installations.
    const { tokenType, token } = getState().authorisation;
    axios
      .get(`${GITHUB_API_URL}/user/installations`, {
        headers: {
          'Accept': GITHUB_APPS_MEDIA_TYPE,
          'Authorization': `${tokenType} ${token}`
        }
      })
      .then((res) => {
        const obj = res.data.installations.reduce((acc, installation) => ({
          ...acc,
          [installation.id]: _.pick(installation, ['account', 'app_id']),
        }), {});

        dispatch(success(obj))
      })
      .catch(err => dispatch(failure(err)));
  }
};

export const selectBranch = branch => createAction(SELECT_BRANCH, { selected: branch });
export const selectCommit = commit => createAction(SELECT_COMMIT, { selected: commit });
export const selectInstallation = installation => (
  createAction(SELECT_INSTALLATION, { selected: installation })
);
export const selectRepository = repository => (
  createAction(SELECT_REPOSITORY, { selected: repository })
);
