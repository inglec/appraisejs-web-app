import PrivateRoute from 'react-private-route';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Callback from 'appraisejs-containers/Callback';
import Home from 'appraisejs-containers/Home';
import Installations from 'appraisejs-containers/Installations';
import Login from 'appraisejs-containers/Login';
import Repositories from 'appraisejs-containers/Repositories';
import Repository from 'appraisejs-containers/Repository';

import './styles';

const App = ({ isAuthenticated }) => (
  <div id="app">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={Callback} />
        <Route path="/login" component={Login} />
        <PrivateRoute
          exact
          path="/installations"
          isAuthenticated={isAuthenticated}
          component={Installations}
        />
        <PrivateRoute
          path="/installations/:installationId/repositories"
          exact
          isAuthenticated={isAuthenticated}
          component={Repositories}
        />
        <PrivateRoute
          path="/installations/:installationId/repositories/:repositoryId"
          isAuthenticated={isAuthenticated}
          component={Repository}
        />
        <Route component={() => '404'} />
      </Switch>
    </BrowserRouter>
  </div>
);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default App;
