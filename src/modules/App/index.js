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
import Callback from 'appraisejs-containers/Callback';

import { oAuthUrl } from 'appraisejs-utils/githubApi.js';

const handleErrors = (err) => {
  console.log('error');
  console.log(err);
};

const Installations = () => {
  return <h1>My Installations</h1>;
}

const Login = () => {
  return <a href={oAuthUrl}>Log in</a>;
};

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/callback' component={Callback} />
        <Route path='/login' component={Login} />
        <PrivateRoute
          isAuthorised={props.isAuthorised}
          path='/installations'
          component={Installations}
        />

        <Redirect to='/installations' />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  isAuthorised: PropTypes.bool.isRequired,
};

export default App;
