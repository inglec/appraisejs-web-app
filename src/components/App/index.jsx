import PropTypes from 'prop-types';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Home from 'appraisejs-components/Home';
import PrivateRoute from 'appraisejs-components/PrivateRoute';
import ConnectedCallback from 'appraisejs-containers/Callback';
import Installations from 'appraisejs-containers/Installations';
import Login from 'appraisejs-containers/Login';
import Repositories from 'appraisejs-containers/Repositories';
import Repository from 'appraisejs-containers/Repository';

import './styles.less';

const App = ({ isAuthenticated }) => (
  <div id="app">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/callback" component={ConnectedCallback} />
        <Route path="/login" component={Login} />
        <PrivateRoute
          component={Installations}
          exact
          isAuthenticated={isAuthenticated}
          path="/installations"
        />
        <PrivateRoute
          component={Repositories}
          exact
          isAuthenticated={isAuthenticated}
          path="/installations/:installationId/repositories"
        />
        <PrivateRoute
          component={Repository}
          isAuthenticated={isAuthenticated}
          path="/installations/:installationId/repositories/:repositoryId"
        />
        <Route component={() => '404'} />
      </Switch>
    </BrowserRouter>
  </div>
);

App.propTypes = { isAuthenticated: PropTypes.bool.isRequired };

export default App;
