import React from 'react';

import { oAuthUrl } from 'appraisejs-utils/githubApi.js';

const Login = () => {
  return <a href={oAuthUrl}>Log in</a>;
};

export default Login;
