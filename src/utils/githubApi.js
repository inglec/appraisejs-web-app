import axios from 'axios';

import { appendUrlParams } from 'appraisejs-utils/requests.js';

import config from 'appraisejs-root/config.js';

const gitHubAppsAcceptHeader = { 'Accept': 'application/vnd.github.machine-man-preview+json' };

const gitHubApiUrl = 'https://api.github.com';

export const getAccessToken = (code) => {
  return axios.post(`${config.serverUrl}/authenticate`, { code })
    .then((response) => {
      return new Promise((resolve, reject) => {
        if ('access_token' in response.data) {
          resolve({
            token: response.data.access_token,
            type: response.data.token_type
          });
        }
        else {
          reject(response.data);
        }
      });
    });
};

export const getInstallationRepos = (tokenType, token, installationId) => {
  return axios.get(`${gitHubApiUrl}/user/installations/${installationId}/repositories`, {
    headers: {
      ...gitHubAppsAcceptHeader,
      'Authorization': `${tokenType} ${token}`
    }
  }).then(response => Promise.resolve(response.data));
};

export const getInstallations = (tokenType, token) => {
  return axios.get(`${gitHubApiUrl}/user/installations`, {
    headers: {
      ...gitHubAppsAcceptHeader,
      'Authorization': `${tokenType} ${token}`
    }
  }).then(response => Promise.resolve(response.data.installations));
};

export const oAuthUrl = appendUrlParams('https://github.com/login/oauth/authorize', {
  client_id: config.clientId
});
