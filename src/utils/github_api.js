import axios from 'axios';

import { appendUrlParams } from 'appraisejs-utils/requests.js';

import config from 'appraisejs-root/config.js';

export const GITHUB_API_URL = 'https://api.github.com';
export const GITHUB_APPS_MEDIA_TYPE = 'application/vnd.github.machine-man-preview+json';

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
  return axios.get(`${GITHUB_API_URL}/user/installations/${installationId}/repositories`, {
    headers: {
      'Accept': GITHUB_APPS_MEDIA_TYPE,
      'Authorization': `${tokenType} ${token}`
    }
  }).then(response => Promise.resolve(response.data));
};

export const getInstallations = (tokenType, token) => {
  return axios.get(`${GITHUB_API_URL}/user/installations`, {
    headers: {
      'Accept': GITHUB_APPS_MEDIA_TYPE,
      'Authorization': `${tokenType} ${token}`
    }
  }).then(response => Promise.resolve(response.data.installations));
};

export const oAuthUrl = appendUrlParams('https://github.com/login/oauth/authorize', {
  client_id: config.clientId
});
