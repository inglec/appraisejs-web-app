import PropTypes from 'prop-types';

import { FETCHED, FETCHING } from 'appraisejs-utils/redux';

export const statusPropType = PropTypes.oneOf([FETCHED, FETCHING]);

export const authPropTypes = {
  token: PropTypes.string,
  tokenType: PropTypes.string,
};

export const installationPropTypes = {
  account: PropTypes.exact({
    avatarUrl: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
  }).isRequired,
  appId: PropTypes.number.isRequired,
};

export const userPropTypes = {
  avatarUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired,

  name: PropTypes.string,
};
