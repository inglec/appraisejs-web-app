import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { propTypesRouteComponent } from 'appraisejs-proptypes/react_router';
import { toCamelCaseKeys } from 'appraisejs-utils/objects';

import RepositoryTile from './RepositoryTile';
import './styles.less';

class Repositories extends Component {
  componentDidMount() {
    const { match, fetchReposInInstallation, reposByInstallation } = this.props;
    const { installationId } = match.params;

    if (installationId) {
      if (_.isEmpty(reposByInstallation[installationId])) {
        fetchReposInInstallation(installationId);
      }
    }
  }

  renderRepositories() {
    const {
      isLoaded,
      match,
      reposByInstallation,
      repositories,
    } = this.props;
    const { installationId } = match.params;

    const installationRepos = isLoaded
      ? reposByInstallation[installationId].reduce((acc, repoId) => {
        acc[repoId] = repositories[repoId];
        return acc;
      }, {})
      : {};

    let path = match.url;
    if (path[path.length - 1] === '/') {
      path = path.substring(0, path.length - 1);
    }

    return (
      <div className="repositories">
        {
          _.map(installationRepos, (repository, id) => {
            const owner = toCamelCaseKeys(
              _.pick(repository.owner, ['avatar_url', 'html_url', 'login']),
            );

            const props = {
              id,
              key: id,
              name: repository.name,
              owner,
              path,
              isPrivate: repository.private,
            };

            return <RepositoryTile {...props} />;
          })
        }
      </div>
    );
  }

  render() {
    const { isLoaded, match } = this.props;
    const { installationId } = match.params;

    return (
      <div>
        <h1>
          Repositories for Installation
          {` ${installationId}`}
        </h1>
        {isLoaded ? this.renderRepositories() : <p>Loading...</p>}
      </div>
    );
  }
}

Repositories.propTypes = {
  ...propTypesRouteComponent,
  fetchReposInInstallation: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,

  // FIX
  reposByInstallation: PropTypes.objectOf(PropTypes.any),
};

Repositories.defaultProps = { reposByInstallation: {} };

export default Repositories;
