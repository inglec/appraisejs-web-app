import { createAction } from 'appraisejs-utils/redux';

import {
  AUTHORISE,
  FETCH_BENCHMARKS,
  FETCH_COMMITS,
  FETCH_INSTALLATIONS,
  FETCH_REPOSITORIES,
} from './actionTypes';

export const setAuthorisation = (tokenType, token) => {
  return createAction(AUTHORISE, {
    token,
    tokenType,
  });
};

export const clearAuthorisation = () => setAuthorisation(null, null);
