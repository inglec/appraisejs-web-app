import { combineReducers } from 'redux';

import { FETCHED, FETCHING, createDataState } from 'appraisejs-utils/redux';

import {
  LOGIN,
  LOGOUT,
  FETCH_INSTALLATIONS_FAILURE,
  FETCH_INSTALLATIONS_STARTED,
  FETCH_INSTALLATIONS_SUCCESS,
  FETCH_REPOSITORIES_FAILURE,
  FETCH_REPOSITORIES_STARTED,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_STARTED,
  FETCH_USER_SUCCESS,
} from './actions';

const auth = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        tokenType: action.tokenType,
      };
    case LOGOUT:
      return {};
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
      return createDataState(FETCHED, null, action.error);
    case FETCH_INSTALLATIONS_STARTED:
      return createDataState(FETCHING);
    case FETCH_INSTALLATIONS_SUCCESS:
      return createDataState(FETCHED, action.data);
    default:
      return state;
  }
};

const reposByInstallation = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_FAILURE:
      return {
        ...state,
        [action.key]: createDataState(FETCHED, null, action.error),
      };
    case FETCH_REPOSITORIES_STARTED:
      return {
        ...state,
        [action.key]: createDataState(FETCHING),
      };
    case FETCH_REPOSITORIES_SUCCESS: {
      const repositoryIds = Object.keys(action.data);
      return {
        ...state,
        [action.key]: createDataState(FETCHED, repositoryIds),
      };
    }
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

const user = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_FAILURE:
      return createDataState(FETCHED, null, action.error);
    case FETCH_USER_STARTED:
      return createDataState(FETCHING);
    case FETCH_USER_SUCCESS:
      return createDataState(FETCHED, action.data);
    case LOGOUT:
      return {};
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
  user,
});
