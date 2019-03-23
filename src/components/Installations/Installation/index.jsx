import PropTypes from 'prop-types';
import React from 'react';

const Installation = ({ account, appId }) => (
  <div>
    {account}
  </div>
);

Installation.propTypes = {
  account: PropTypes.exact({
    avatarUrl: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
  }).isRequired,
  appId: PropTypes.number.isRequired,
};

export default Installation;
