import PropTypes from 'prop-types';
import React from 'react';
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import PrivateRoute from 'appraisejs-components/PrivateRoute';
import ConnectedCallback from 'appraisejs-containers/Callback';
import Installations from 'appraisejs-containers/Installations';
import Login from 'appraisejs-containers/Login';
import Repositories from 'appraisejs-containers/Repositories';

import './styles.less';

const App = (props) => {
  return (
    <div id='app'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={props => 'Welcome!'} />
          <Route path='/callback' component={ConnectedCallback} />
          <Route path='/login' component={Login} />
          <PrivateRoute
            isAuthenticated={props.isAuthenticated}
            exact path='/installations'
            component={Installations}
          />
          <PrivateRoute
            isAuthenticated={props.isAuthenticated}
            exact path='/installations/:installationId'
            component={Repositories}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default App;
