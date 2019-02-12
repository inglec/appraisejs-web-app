import _ from 'lodash';

export default class StateLoader {
  constructor() {
    this.state = {};
  }

  static filterState(state) {
    return _.pick(state, ['authentication']);
  }

  loadState() {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState) {
        this.state = JSON.parse(serializedState);
      }

      return this.state;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return this.state;
    }
  }

  saveState(newState) {
    try {
      const filteredNewState = this.constructor.filterState(newState);
      const filteredCurrentState = this.constructor.filterState(this.state);

      // Only store state if it has changed.
      if (!_.isEqual(filteredNewState, filteredCurrentState)) {
        this.state = newState;

        const serializedState = JSON.stringify(filteredNewState);
        localStorage.setItem('state', serializedState);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}
