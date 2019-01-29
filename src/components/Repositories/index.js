import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';

import RepositoryTile from './RepositoryTile';
import reactRouterPropTypes from 'appraisejs-proptypes/react_router';
import { toCamelCaseKeys } from 'appraisejs-utils/objects';

import './styles.less';

class Repositories extends Component {
  componentDidMount() {
    const { installationId } = this.props.match.params;

    if (installationId) {
      if (_.isEmpty(this.props.reposByInstallation[installationId])) {
        this.props.fetchReposInInstallation(installationId);
      }
    }
  }

  renderRepositories() {
    const { installationId } = this.props.match.params;

    const installationRepos = this.props.isLoaded
      ? this.props.reposByInstallation[installationId].reduce((acc, repoId) => {
        acc[repoId] = this.props.repositories[repoId];
        return acc;
      }, {})
      : {};

    let path = this.props.match.url;
    if (path[path.length - 1] === '/') {
      path = path.substring(0, path.length - 1)
    }

    return (
      <div className='repositories'>
        {
          _.map(installationRepos, (repository, id) => {
            const owner = toCamelCaseKeys(
              _.pick(repository.owner, ['avatar_url', 'html_url', 'login'])
            );

            const props = {
              id,
              key: id,
              name: repository.name,
              owner,
              path,
              isPrivate: repository.private,
            };

            return <RepositoryTile {...props}/>;
          })
        }
      </div>
    );
  }

  render() {
    const { installationId } = this.props.match.params;

    return (
      <div>
        <h1>Repositories for Installation {installationId}</h1>
        {this.props.isLoaded ? this.renderRepositories() : <p>Loading...</p>}
      </div>
    );
  }
};

Repositories.propTypes = {
  ...reactRouterPropTypes,
  fetchReposInInstallation: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,

  reposByInstallation: PropTypes.object,
};

Repositories.defaultProps = {
  reposByInstallation: {},
};

export default Repositories;
