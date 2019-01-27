import { combineReducers } from 'redux';

import {
  AUTHORISE,
  FETCH_INSTALLATIONS_FAILURE,
  FETCH_INSTALLATIONS_STARTED,
  FETCH_INSTALLATIONS_SUCCESS,
  SELECT_BRANCH,
  SELECT_COMMIT,
  SELECT_INSTALLATION,
  SELECT_REPOSITORY,
} from './actions';

const createAuthObj = (tokenType, token) => ({
  token,
  tokenType,
});

const authorisation = (state = createAuthObj(null, null), action) => {
  switch (action.type) {
    case AUTHORISE:
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

const repositoriesByInstallation = (state = {}, action) => {
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
        data: action.data,
        isFetching: false,
      };
    default:
      return state;
  }
};

const selectedBranch = (state = null, action) => {
  switch (action.type) {
    case SELECT_BRANCH:
      return action.selected;
    default:
      return state;
  }
};

const selectedCommit = (state = null, action) => {
  switch (action.type) {
    case SELECT_COMMIT:
      return action.selected;
    default:
      return state;
  }
};

const selectedInstallation = (state = null, action) => {
  switch (action.type) {
    case SELECT_INSTALLATION:
      return action.selected;
    default:
      return state;
  }
};

const selectedRepository = (state = null, action) => {
  switch (action.type) {
    case SELECT_REPOSITORY:
      return action.selected;
    default:
      return state;
  }
};

export default combineReducers({
  authorisation,
  benchmarkResults,
  benchmarksByCommit,
  commitsByRepository,
  installations,
  repositoriesByInstallation,
  selectedBranch,
  selectedCommit,
  selectedInstallation,
  selectedRepository,
});
