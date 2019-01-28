import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';

class Repositories extends Component {
  componentDidMount() {
    if (_.isEmpty(this.props.repositories)) {
      const params = qs.parse(this.props.location.search);
      this.props.fetchRepositories(params.installationId);
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
                  _.map(this.props.repositories, (repository, id) => (
                    <p key={id} onClick={() => this.props.selectRepository(id)}>{id}</p>
                  ))
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
  fetchRepositories: PropTypes.func.isRequired,
  // selectRepository: PropTypes.func.isRequired,

  repositories: PropTypes.object,
  isLoaded: PropTypes.bool,
};

Repositories.defaultProps = {
  repositories: {},
  isLoaded: false,
};

export default Repositories;
