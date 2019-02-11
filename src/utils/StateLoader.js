import _ from 'lodash';

const initialiseState = (state = {}) => ({
  authentication: {
    token: null,
    tokenType: null,
  },
  benchmarkResults: {},
  benchmarksByCommit: {},
  commitsByRepository: {},
  installations: {},
  reposByInstallation: {},
  repositories: {},
  ...state,
});

const filterState = state => _.pick(state, ['authentication']);

export default class StateLoader {
  constructor() {
    this.state = initialiseState();
  }

  loadState() {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState !== null) {
        const state = JSON.parse(serializedState);
        this.state = initialiseState(state);
      }
      return this.state;
    } catch (err) {
      console.error(err);
      return this.state;
    }
  }

  saveState(state) {
    try {
      const filteredState = filterState(state);

      // Only store state if it has changed.
      if (!_.isEqual(filteredState, filterState(this.state))) {
        this.state = state;

        const serializedState = JSON.stringify(filteredState);
        localStorage.setItem('state', serializedState);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
