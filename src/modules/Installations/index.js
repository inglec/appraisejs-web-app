import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Installations extends Component {
  componentDidMount() {
    this.props.fetchInstallations();
  }

  render() {
    return (
      <div>
        <h1>My Installations</h1>
        {
          this.props.isLoaded
            ? (
              <div className='installations'>
                {
                  _.map(this.props.installations, (installation, id) => (
                    <p key={id} onClick={() => this.props.selectInstallation(id)}>{id}</p>
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

Installations.propTypes = {
  fetchInstallations: PropTypes.func.isRequired,
  selectInstallation: PropTypes.func.isRequired,

  installations: PropTypes.object,
  isLoaded: PropTypes.bool,
};

Installations.defaultProps = {
  installations: {},
  isLoaded: false,
};

export default Installations;
