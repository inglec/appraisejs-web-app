import Axios from 'axios';
import React from 'react';
import {
  BrowserRouter,
  Link,
  Route
} from 'react-router-dom';

import config from 'appraisejs-root/config.js';

import { appendUrlParams } from 'appraisejs-utils/requests.js';
// import { genRandomString } from 'appraisejs-utils/strings.js';

// const stateString = getRandomString();
const oAuthUrl = appendUrlParams('https://github.com/login/oauth/authorize', {
  client_id: config.clientId,
  // state: stateString
});

const getAccessToken = (code) => {
  return Axios.post(`${config.serverUrl}/authenticate`, { code })
    .then((response) => {
      if ('access_token' in response.data) {
        return Promise.resolve(response.data);
      }
      return Promise.reject(response.data);
    });
};

const getUserInstallations = (tokenType, accessToken) => {
  return Axios.get('https://api.github.com/user/installations', {
    headers: {
      'Accept': 'application/vnd.github.machine-man-preview+json',
      'Authorization': `${tokenType} ${accessToken}`
    }
  });
};

const getEndpoint = (tokenType, accessToken) => {
  return Axios.get('https://api.github.com/user/installations', {
    headers: {
      'Accept': 'application/vnd.github.machine-man-preview+json',
      'Authorization': `${tokenType} ${accessToken}`
    }
  });
};

const handleErrors = (err) => {
  console.log('error');
  console.log(err);
};

const Callback = (props) => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');

  // Exchange code for access token.
  getAccessToken(code)
    .then(response => getEndpoint(response.token_type, response.access_token))
    .then(response => console.log(response.data.installations))
    .catch(handleErrors);

  // if (url.searchParams.get('state') !== stateString) {
  //   console.log(stateString, url.searchParams.get('state'));
  //   return <p>Something is wrong with the state string</p>;
  // }

  return <p>Code: {code}</p>;
};

const Test = (props) => {
  return <p>{JSON.stringify(props.match, null, 2)}</p>;
};

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to='/login'>Log in</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/repositories'>Repositories</Link></li>
        </ul>

        <a href={oAuthUrl}>Sign in</a>

        <Route path='/callback' component={Callback} />
        <Route path='/login' component={Test} />
        <Route path='/register' component={Test} />
        <Route path='/repositories' component={Test} />
      </div>
    </BrowserRouter>
  );
};

export default App;
