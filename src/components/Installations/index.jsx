import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { propTypesRouteComponent } from 'appraisejs-proptypes/react_router';

class Installations extends Component {
  componentDidMount() {
    const { fetchInstallations, installations } = this.props;

    if (_.isEmpty(installations)) {
      fetchInstallations();
    }
  }

  render() {
    const { installations, isLoaded, match } = this.props;

    return (
      <div>
        <h1>My Installations</h1>
        {
          isLoaded
            ? (
              <div className="installations">
                {
                  _.map(installations, (installation, id) => (
                    <Link
                      key={id}
                      to={`${match.path}/${id}/repositories`}
                    >
                      {`Installation ${id}`}
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
}

Installations.propTypes = {
  ...propTypesRouteComponent,
  fetchInstallations: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,

  // FIX
  installations: PropTypes.objectOf(PropTypes.any),
};

Installations.defaultProps = { installations: {} };

export default Installations;
