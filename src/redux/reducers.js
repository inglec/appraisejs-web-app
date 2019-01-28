import { combineReducers } from 'redux';

import {
  AUTHENTICATE,
  FETCH_INSTALLATIONS_FAILURE,
  FETCH_INSTALLATIONS_STARTED,
  FETCH_INSTALLATIONS_SUCCESS,
  FETCH_REPOSITORIES_FAILURE,
  FETCH_REPOSITORIES_STARTED,
  FETCH_REPOSITORIES_SUCCESS,
} from './actions';

const createAuthObj = (tokenType, token) => ({
  token,
  tokenType,
});

const authentication = (state = createAuthObj(null, null), action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return createAuthObj(action.tokenType, action.token);
    default:
      return state;
  }
};

const benchmarkResults = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const benchmarksByCommit = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const commitsByRepository = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const installations = (state = {}, action) => {
  switch (action.type) {
    case FETCH_INSTALLATIONS_FAILURE:
      return {
        isFetching: false,
        message: action.message,
      };
    case FETCH_INSTALLATIONS_STARTED:
      return { isFetching: true };
    case FETCH_INSTALLATIONS_SUCCESS:
      return {
        data: action.data,
        isFetching: false,
      };
    default:
      return state;
  }
};

const reposByInstallation = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_FAILURE:
      return {
        isFetching: false,
        message: action.message,
      };
    case FETCH_REPOSITORIES_STARTED:
      return { isFetching: true };
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        data: {
          ...state.data,
          [action.key]: action.data,
        },
        isFetching: false,
      };
    default:
      return state;
  }
};

export default combineReducers({
  authentication,
  benchmarkResults,
  benchmarksByCommit,
  commitsByRepository,
  installations,
  reposByInstallation,
});
