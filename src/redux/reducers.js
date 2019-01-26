import { combineReducers } from 'redux';

import {
  AUTHORISE,
  FETCH_BENCHMARKS,
  FETCH_COMMITS,
  FETCH_INSTALLATIONS,
  FETCH_REPOSITORIES,
} from './actionTypes';

const createDataObject = data => ({
  data: null,
  didInvalidate: false,
  isFetching: false,
  lastUpdated: null,
});

// We use a function to prevent mutation.
const getInitialState = (field) => {
  switch (field) {
    case 'authorisation':
      return {
        token: null,
        tokenType: null,
      };
    case 'benchmarkResults':
    case 'benchmarksByCommit':
    case 'commitsByRepository':
    case 'repositoriesByInstallation':
      return {};
    case 'installations':
      return createDataObject([]);
    case 'selectedBranch':
    case 'selectedCommit':
    case 'selectedInstallation':
    case 'selectedRepository':
    default:
      return null;
  }
};

const authorisation = (state = getInitialState('authorisation'), action) => {
  switch (action.type) {
    case AUTHORISE:
      return {
        token: action.token,
        tokenType: action.tokenType,
      };
    default:
      return state;
  }
};

const benchmarkResults = (state = getInitialState('benchmarkResults'), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const benchmarksByCommit = (state = getInitialState('benchmarksByCommit'), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const commitsByRepository = (state = getInitialState('commitsByRepository'), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const installations = (state = getInitialState('installations'), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const repositoriesByInstallation = (
  state = getInitialState('repositoriesByInstallation'),
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedBranch = (state = getInitialState('selectedBranch'), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedCommit = (state = getInitialState('selectedCommit'), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedInstallation = (state = getInitialState('selectedInstallation'), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedRepository = (state = getInitialState('selectedRepository'), action) => {
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
