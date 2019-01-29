import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

import './styles.less';

const RepositoryTile = (props) => {
  return (
    <div className='repositorytile'>
      <Link to={`${props.path}/${props.id}`}>{props.name}</Link>
      <img src={props.owner.avatarUrl} className='repositorytile-avatar' />
      <a href={props.owner.htmlUrl} target='_blank'>{props.owner.login}</a>
      {props.isPrivate ? <p>Private</p> : null}
    </div>
  )
};

RepositoryTile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.exact({
    avatarUrl: PropTypes.string.isRequired,
    htmlUrl: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

export default RepositoryTile;
