import axios from 'axios';

import { urls } from 'appraisejs-root/config';

export const getAccessToken = code => (
  axios({
    method: 'POST',
    baseURL: urls.appraisejs.supervisor.base,
    url: urls.appraisejs.supervisor.paths.getAccessToken,
    data: { code },
  })
);

export const retestCommit = (installationId, owner, repositoryId, repositoryName, commitId) => (
  axios({
    method: 'POST',
    baseURL: urls.appraisejs.supervisor.base,
    url: urls.appraisejs.supervisor.paths.retestCommit,
    data: {
      commitId,
      installationId,
      owner,
      repository: repositoryName,
      repositoryId,
    },
    json: true,
  })
);
