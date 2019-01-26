import React from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthorised, ...rest }) => {
  const render = (props) => {
    return isAuthorised
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
