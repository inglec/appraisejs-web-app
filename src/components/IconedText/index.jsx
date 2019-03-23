import PropTypes from 'prop-types';
import React from 'react';

import './styles';

const IconedText = ({ icon: Icon, children }) => (
  <span className="iconedtext">
    <Icon className="icon" />
    <span className="text">{children}</span>
  </span>
);

IconedText.propTypes = {
  icon: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default IconedText;
