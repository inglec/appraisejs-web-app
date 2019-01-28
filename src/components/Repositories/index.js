import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';

class Repositories extends Component {
  componentDidMount() {
    const { installationId } = this.props.match.params;

    if (installationId) {
      if (_.isEmpty(this.props.reposByInstallation[installationId])) {
        this.props.fetchReposInInstallation(installationId);
      }
    }
  }

  render() {
    const { installationId } = this.props.match.params;

    const installationRepos = this.props.isLoaded
      ? this.props.reposByInstallation[installationId].reduce((acc, repoId) => {
        acc[repoId] = this.props.repositories[repoId];
        return acc;
      }, {})
      : {};

    return (
      <div>
        <h1>My Repositories</h1>
        {
          this.props.isLoaded
            ? (
              <div className='repositories'>
                {
                  _.map(
                    installationRepos,
                    (repository, id) => <p key={id}>{repository.name}</p>
                  )
                }
              </div>
            )
            : <p>Loading...</p>
        }
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
