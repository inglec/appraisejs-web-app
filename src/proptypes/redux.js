import PropTypes from 'prop-types';

import { FETCHED, FETCHING, UNFETCHED } from 'appraisejs-utils/redux';

export const statusPropType = PropTypes.oneOf([FETCHED, FETCHING, UNFETCHED]);

const userPropType = {
  avatarUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired,
};

export const authPropTypes = {
  token: PropTypes.string,
  tokenType: PropTypes.string,
};

export const installationPropTypes = {
  account: PropTypes.exact(userPropType).isRequired,
  appId: PropTypes.number.isRequired,
};

export const repositoryPropTypes = {
  htmlUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.exact(userPropType).isRequired,
  private: PropTypes.bool.isRequired,

  description: PropTypes.string,
};

const benchmarkDefinitionPropTypes = {
  maxAttempts: PropTypes.number.isRequired,
  runs: PropTypes.number.isRequired,
  timeout: PropTypes.number.isRequired,
};

export const testPropTypes = {
  benchmarks: PropTypes.objectOf(
    PropTypes.exact({
      attempts: PropTypes.arrayOf(
        // Array of runs
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.exact({
              error: PropTypes.string.isRequired,
            }),
            PropTypes.exact({
              time: PropTypes.number.isRequired,

              value: PropTypes.any,
            }),
          ]),
        ),
      ),
      benchmarkDefinition: PropTypes.exact(benchmarkDefinitionPropTypes).isRequired,
      filepath: PropTypes.string.isRequired,

      errors: PropTypes.arrayOf(PropTypes.string),
      lineNumber: PropTypes.number,
    }),
  ),
  commitId: PropTypes.string.isRequired,
  endTime: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  queuedAt: PropTypes.number.isRequired,
  repositoryId: PropTypes.number.isRequired,
  startTime: PropTypes.number.isRequired,
  workerId: PropTypes.string.isRequired,

  errors: PropTypes.arrayOf(
    PropTypes.exact({
      errors: PropTypes.arrayOf(PropTypes.string).isRequired,
      stage: PropTypes.string.isRequired,
    }),
  ),
};

export const userPropTypes = {
  avatarUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired,

  name: PropTypes.string,
};
