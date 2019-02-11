import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from 'appraisejs-containers/App';
import reducer from 'appraisejs-redux/reducers';
import StateLoader from 'appraisejs-utils/StateLoader';

const stateLoader = new StateLoader();

const store = createStore(
  reducer,
  stateLoader.loadState(),
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => stateLoader.saveState(store.getState()));

const Component = (
  <Provider store={store}>
    <App />
  </Provider>
);
const root = document.getElementById('root');
render(Component, root);
