import axios from 'axios';
import _ from 'lodash';

import { createAction } from 'appraisejs-utils/redux';

// Action types.
export const AUTHORISE = 'AUTHORISE';
export const FETCH_INSTALLATIONS = 'FETCH_INSTALLATIONS';

// Action status for async actions.
export const FAILURE = 'FAILURE';
export const STARTED = 'STARTED';
export const SUCCESS = 'SUCCESS';


export const setAuthorisation = (tokenType, token) => {
  return createAction(AUTHORISE, {
    token,
    tokenType,
  });
};

export const clearAuthorisation = () => setAuthorisation(null, null);

export const fetchInstallations = () => {
  const failure = (error) => {
    return createAction(FETCH_INSTALLATIONS, {
      message: error,
      status: FAILURE,
    });
  };

  const started = () => createAction(FETCH_INSTALLATIONS, { status: STARTED });

  const success = (installations) => {
    return createAction(FETCH_INSTALLATIONS, {
      data: installations,
      status: SUCCESS,
    });
  };

  return (dispatch, getState) => {
    const { tokenType, token } = getState().authorisation;

    dispatch(started());

    axios
      .get('https://api.github.com/user/installations', {
        headers: {
          'Accept': 'application/vnd.github.machine-man-preview+json',
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
