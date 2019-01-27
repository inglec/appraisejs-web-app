import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Repositories extends Component {
  componentDidMount() {
    // this.props.fetchRepositories();
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
  fetchRepositories: PropTypes.func.isRequired,
  selectRepository: PropTypes.func.isRequired,

  repositories: PropTypes.object,
  isLoaded: PropTypes.bool,
};

Repositories.defaultProps = {
  repositories: {},
  isLoaded: false,
};

export default Repositories;
