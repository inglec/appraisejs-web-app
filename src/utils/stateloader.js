import _ from 'lodash';

class StateLoader {
  constructor() {
    this.state = this.initialiseState();
  }

  initialiseState(state = {}) {
    return {
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
    };
  };

  filterState(state) {
    return _.pick(state, ['authentication']);
  }

  loadState() {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState !== null) {
        const state = JSON.parse(serializedState);
        this.state = this.initialiseState(state);
      }
      return this.state;
    }
    catch (err) {
      console.error(err);
      return this.state;
    }
  }

  saveState(state) {
    try {
      const filteredState = this.filterState(state);

      // Only store state if it has changed.
      if (!_.isEqual(filteredState, this.filterState(this.state))) {
        this.state = state;

        const serializedState = JSON.stringify(filteredState);
        localStorage.setItem('state', serializedState);
      }
    }
    catch (err) {
      console.error(err);
    }
  }
}

export default StateLoader;
