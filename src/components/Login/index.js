import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';
import { oAuthUrl } from 'appraisejs-utils/github_api.js';

const Login = (props) => {
  return props.isAuthenticated
    ? <Redirect to='/installations' />
    : <a href={oAuthUrl}>Log in via GitHub</a>;
};

Login.propTypes = {
  ...reactRouterPropTypes,
  isAuthenticated: PropTypes.bool.isRequired
};

export default Login;
