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

const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        tokenType: action.tokenType,
      };
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
        error: action.message,
        isFetching: false,
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
        ...state,
        isFetching: false,
        error: action.message,
      };
    case FETCH_REPOSITORIES_STARTED:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.key]: Object.keys(action.data),
        },
        isFetching: false,
      };
    default:
      return state;
  }
};

const repositories = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export default combineReducers({
  auth,
  benchmarkResults,
  benchmarksByCommit,
  commitsByRepository,
  installations,
  reposByInstallation,
  repositories,
});
