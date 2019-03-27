import axios from 'axios';

import { appendUrlParams } from 'appraisejs-utils/requests';

import { clientId } from 'appraisejs-root/config';

export const GITHUB_API_URL = 'https://api.github.com';
export const GITHUB_APPS_MEDIA_TYPE = 'application/vnd.github.machine-man-preview+json';

export const getInstallationRepos = (tokenType, token, installationId) => (
  axios({
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
  axios({
    method: 'GET',
    baseURL: GITHUB_API_URL,
    url: '/user/installations',
    headers: {
      Accept: GITHUB_APPS_MEDIA_TYPE,
      Authorization: `${tokenType} ${token}`,
    },
  })
);

export const getUser = (tokenType, token) => (
  axios({
    method: 'GET',
    baseURL: GITHUB_API_URL,
    url: '/user',
    headers: { Authorization: `${tokenType} ${token}` },
  })
);

export const oAuthUrl = appendUrlParams('https://github.com/login/oauth/authorize', {
  client_id: clientId,
});
