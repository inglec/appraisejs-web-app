import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { propTypesRouteComponent } from 'appraisejs-proptypes/react_router';
import { oAuthUrl } from 'appraisejs-utils/github_api';

const Login = ({ isAuthenticated }) => (
  isAuthenticated
    ? <Redirect to="/installations" />
    : <a href={oAuthUrl}>Log in via GitHub</a>
);

Login.propTypes = {
  ...propTypesRouteComponent,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
