import React from 'react';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';
import { oAuthUrl } from 'appraisejs-utils/github_api.js';

const Login = () => {
  return <a href={oAuthUrl}>Log in</a>;
};

Login.propTypes = reactRouterPropTypes;

export default Login;
