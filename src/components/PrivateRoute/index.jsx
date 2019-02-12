import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { propTypesRoute } from 'appraisejs-proptypes/react_router';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const render = (props) => {
    // eslint-disable-next-line react/prop-types
    const { location } = props;

    return isAuthenticated
      ? <Component {...props} />
      : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
  };

  return <Route {...rest} render={render} />;
};

PrivateRoute.propTypes = {
  ...propTypesRoute,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
