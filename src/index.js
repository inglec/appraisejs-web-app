import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from 'appraisejs-containers/App'
import reducer from 'appraisejs-redux/reducers';

// Setup Redux store.
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const Component = (
  <Provider store={store}>
    <App />
  </Provider>
);
const root = document.getElementById('root');
render(Component, root);
