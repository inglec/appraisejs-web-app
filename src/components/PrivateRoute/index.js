import React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const render = (props) => {
    return isAuthenticated
      ? <Component {...props} />
      : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      );
  }
  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
