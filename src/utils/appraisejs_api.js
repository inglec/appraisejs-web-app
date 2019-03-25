import axios from 'axios';
import { stringify } from 'query-string';

import { urls } from 'appraisejs-root/config';

export const getRepositoryTests = repositoryId => (
  axios({
    method: 'GET',
    baseURL: urls.appraisejs.api.base,
    url: `${urls.appraisejs.api.paths.getTests}?${stringify({ repositoryId })}`,
  })
);
