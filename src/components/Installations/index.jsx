import { map } from 'lodash/collection';
import { isEmpty } from 'lodash/lang';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { routePropTypes } from 'appraisejs-proptypes/react_router';
import { statusPropType, installationPropTypes } from 'appraisejs-proptypes/redux';

class Installations extends Component {
  componentDidMount() {
    const { fetchInstallations, installations } = this.props;

    if (isEmpty(installations)) {
      fetchInstallations();
    }
  }

  render() {
    const { installations, isLoaded, match } = this.props;

    return (
      <div className="page installations">
        <div className="page-container">
          <h1>My Installations</h1>
          {
            isLoaded
              ? (
                <div className="installations">
                  {
                    map(installations, (installation, id) => (
                      <Link
                        key={id}
                        to={`${match.path}/${id}/repositories`}
                      >
                        {'Installation '}
                        {id}
                      </Link>
                    ))
                  }
                </div>
              )
              : <p>Loading...</p>
          }
        </div>
      </div>
    );
  }
}

Installations.propTypes = {
  ...routePropTypes,
  fetchInstallations: PropTypes.func.isRequired,
  installations: PropTypes.exact({
    data: PropTypes.objectOf(
      PropTypes.exact(installationPropTypes),
    ),
    error: PropTypes.string,
    status: statusPropType,
  }).isRequired,
};

export default Installations;
