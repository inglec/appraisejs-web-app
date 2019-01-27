import { combineReducers } from 'redux';

import {
  AUTHORISE,
  FAILURE,
  FETCH_INSTALLATIONS,
  STARTED,
  SUCCESS,
} from './actions';

const token = (state = null, action) => {
  switch (action.type) {
    case AUTHORISE:
      return action.token;
    default:
      return state;
  }
};

const tokenType = (state = null, action) => {
  switch (action.type) {
    case AUTHORISE:
      return action.tokenType;
    default:
      return state;
  }
};

const authorisation = combineReducers({
  token,
  tokenType,
});

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
    case FETCH_INSTALLATIONS: {
      switch (action.status) {
        case FAILURE:
          return {
            isFetching: false,
            message: action.message,
          };
        case STARTED:
          return { isFetching: true };
        case SUCCESS:
          return {
            data: action.data,
            isFetching: false,
          };
        default:
          return {};
      }
    }
    default:
      return state;
  }
};

const repositoriesByInstallation = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedBranch = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedCommit = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedInstallation = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedRepository = (state = null, action) => {
  switch (action.type) {
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
