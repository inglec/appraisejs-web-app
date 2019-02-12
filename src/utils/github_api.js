import axios from 'axios';

import { appendUrlParams } from 'appraisejs-utils/requests';

import config from 'appraisejs-root/config';

export const GITHUB_API_URL = 'https://api.github.com';
export const GITHUB_APPS_MEDIA_TYPE = 'application/vnd.github.machine-man-preview+json';

export const getAccessToken = code => (
  axios.request({
    method: 'POST',
    baseURL: config.serverUrl,
    url: '/authenticate',
    data: { code },
  })
);

export const getInstallationRepos = (tokenType, token, installationId) => (
  axios.request({
    method: 'GET',
    baseURL: GITHUB_API_URL,
    url: `/user/installations/${installationId}/repositories`,
    headers: {
      Accept: GITHUB_APPS_MEDIA_TYPE,
      Authorization: `${tokenType} ${token}`,
    },
  })
);

export const getInstallations = (tokenType, token) => (
  axios.request({
    method: 'GET',
    baseURL: GITHUB_API_URL,
    url: '/user/installations',
    headers: {
      Accept: GITHUB_APPS_MEDIA_TYPE,
      Authorization: `${tokenType} ${token}`,
    },
  })
);

export const oAuthUrl = appendUrlParams('https://github.com/login/oauth/authorize', {
  client_id: config.clientId,
});
