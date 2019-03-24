import { mapValues } from 'lodash/object';
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
  FETCH_TESTS_FAILURE,
  FETCH_TESTS_STARTED,
  FETCH_TESTS_SUCCESS,
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

const installations = (state = createDataState(), action) => {
  switch (action.type) {
    case FETCH_INSTALLATIONS_FAILURE:
      return createDataState(FETCHED, null, action.error);
    case FETCH_INSTALLATIONS_STARTED:
      return createDataState(FETCHING);
    case FETCH_INSTALLATIONS_SUCCESS:
      return createDataState(FETCHED, action.data);
    case LOGOUT:
      return createDataState();
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
    case FETCH_INSTALLATIONS_SUCCESS:
      return {
        ...state,
        ...mapValues(action.data, () => createDataState()),
      };
    case LOGOUT:
      return {};
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
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

const tests = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TESTS_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

const testsByRepository = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        ...mapValues(action.data, () => createDataState()),
        ...state,
      };
    case FETCH_TESTS_FAILURE:
      return {
        ...state,
        [action.key]: createDataState(FETCHED, null, action.errors),
      };
    case FETCH_TESTS_STARTED:
      return {
        ...state,
        [action.key]: createDataState(FETCHING),
      };
    case FETCH_TESTS_SUCCESS:
      return {
        ...state,
        [action.key]: createDataState(FETCHED, Object.keys(action.data)),
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

const user = (state = createDataState(), action) => {
  switch (action.type) {
    case FETCH_USER_FAILURE:
      return createDataState(FETCHED, null, action.error);
    case FETCH_USER_STARTED:
      return createDataState(FETCHING);
    case FETCH_USER_SUCCESS:
      return createDataState(FETCHED, action.data);
    case LOGOUT:
      return createDataState();
    default:
      return state;
  }
};

export default combineReducers({
  auth,
  installations,
  reposByInstallation,
  repositories,
  tests,
  testsByRepository,
  user,
});
