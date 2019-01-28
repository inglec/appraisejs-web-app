import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';

class Installations extends Component {
  componentDidMount() {
    if (_.isEmpty(this.props.installations)) {
      this.props.fetchInstallations();
    }
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
                    <Link
                      key={id}
                      to={`${this.props.match.path}/${id}`}
                    >
                      Installation {id}
                    </Link>
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
  ...reactRouterPropTypes,
  fetchInstallations: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,

  installations: PropTypes.object,
};

Installations.defaultProps = {
  installations: {},
};

export default Installations;
