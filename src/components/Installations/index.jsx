import { map } from 'lodash/collection';
import { isEmpty } from 'lodash/lang';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { ScaleLoader as Loader } from 'react-spinners';

import { routePropTypes } from 'appraisejs-proptypes/react_router';
import { installationPropTypes, statusPropType } from 'appraisejs-proptypes/redux';
import { FETCHED, UNFETCHED } from 'appraisejs-utils/redux';

import { installationUrl } from 'appraisejs-root/config';

import './styles';

class Installations extends PureComponent {
  componentDidMount() {
    const { fetchInstallations, installations } = this.props;

    if (installations.status === UNFETCHED) {
      fetchInstallations();
    }
  }

  renderInstallations() {
    const { installations } = this.props;

    if (installations.status !== FETCHED) {
      return (
        <div className="loader-container centered">
          <Loader height={100} margin="5px" radius={500} color="cornflowerblue" />
        </div>
      );
    }

    return installations.error
      ? 'An error occurred'
      : (
        <div className="installations">
          {
            map(installations.data, (installation, id) => (
              <Link
                key={id}
                to={{
                  pathname: '/repositories',
                  search: `?installationId=${id}`,
                }}
              >
                {'Installation '}
                {id}
              </Link>
            ))
          }
        </div>
      );
  }

  render() {
    const { installations } = this.props;

    return (
      <div className="page installations">
        <div className="page-container">
          <h1>My Installations</h1>
          {this.renderInstallations()}
          {
            installations.status === FETCHED && isEmpty(installations.data)
              ? (
                <a href={installationUrl} target="_blank" rel="noopener noreferrer">
                  Install Appraise.js
                </a>
              )
              : null
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
    status: statusPropType.isRequired,
  }).isRequired,
};

export default Installations;
