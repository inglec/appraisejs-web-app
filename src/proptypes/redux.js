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

export const userPropTypes = {
  avatarUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired,

  name: PropTypes.string,
};
