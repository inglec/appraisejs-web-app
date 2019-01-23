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
        return Promise.resolve({
          token: response.data.access_token,
          type: response.data.token_type
        });
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
  }).then(response => Promise.resolve(response.data.installations));
};

const getAccessibleRepos = (tokenType, accessToken, installationId) => {
  return Axios.get(`https://api.github.com/user/installations/${installationId}/repositories`, {
    headers: {
      'Accept': 'application/vnd.github.machine-man-preview+json',
      'Authorization': `${tokenType} ${accessToken}`
    }
  }).then(response => Promise.resolve(response.data));
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
    .then(({ token, type }) => {
      getUserInstallations(type, token)
        .then(installations => getAccessibleRepos(type, token, installations[0].id))
        .then(console.log)
        .catch(handleErrors);
    })
    // TODO: MZake specific to access token.
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
