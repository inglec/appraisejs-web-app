import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import './styles.less';

const RepositoryTile = ({
  id,
  isPrivate,
  name,
  owner,
  path,
}) => (
  <div className="repositorytile">
    <Link to={`${path}/${id}`}>{name}</Link>
    <img src={owner.avatarUrl} alt={`${name}'s avatar'`} className="repositorytile-avatar" />
    <a href={owner.htmlUrl} target="_blank" rel="noopener noreferrer">{owner.login}</a>
    {isPrivate ? <p>Private</p> : null}
  </div>
);

RepositoryTile.propTypes = {
  id: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.exact({
    avatarUrl: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
};

export default RepositoryTile;
