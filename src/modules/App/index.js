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
import Login from 'appraisejs-modules/Login';

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/callback' component={ConnectedCallback} />
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
