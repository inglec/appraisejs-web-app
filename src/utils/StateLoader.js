import { isEqual } from 'lodash/lang';
import { pick } from 'lodash/object';

export default class StateLoader {
  constructor() {
    this.state = {};
  }

  static filterState(state) {
    return pick(state, 'auth');
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
      if (!isEqual(filteredNewState, filteredCurrentState)) {
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
