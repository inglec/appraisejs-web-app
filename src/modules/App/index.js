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
import Repositories from 'appraisejs-containers/Repositories';
import Login from 'appraisejs-modules/Login';

import './styles.less';

const Root = props => <Redirect to='/installations' />;

const App = (props) => {
  return (
    <div id='app'>
      <BrowserRouter>
        <Switch>
          <Route path='/callback' component={ConnectedCallback} />
          <Route path='/login' component={Login} />
          <PrivateRoute
            isAuthenticated={props.isAuthenticated}
            path='/installations'
            component={Installations}
          />
          <PrivateRoute
            isAuthenticated={props.isAuthenticated}
            path='/repositories'
            component={Repositories}
          />
          <Route path='/' component={Root} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default App;
