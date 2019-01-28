import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';

class Repositories extends Component {
  constructor(props) {
    super(props);

    const { installationId } = qs.parse(props.location.search);

    this.state = { installationId };
  }

  componentDidMount() {
    if (this.state.installationId) {
      if (_.isEmpty(this.props.reposByInstallation[this.state.installationId])) {
        this.props.fetchReposInInstallation(this.state.installationId);
      }
    }
  }

  render() {
    return (
      <div>
        <h1>My Repositories</h1>
        {
          this.props.isLoaded
            ? (
              <div className='repositories'>
                {
                  _.map(
                    this.props.reposByInstallation[this.state.installationId],
                    (repository, id) => <p key={id}>{id}</p>
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
}

export default Repositories;
