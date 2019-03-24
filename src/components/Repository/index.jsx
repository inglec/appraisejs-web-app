import { pick } from 'lodash';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import React, { PureComponent } from 'react';

import { routePropTypes } from 'appraisejs-proptypes/react_router';
import {
  installationPropTypes,
  repositoryPropTypes,
  statusPropType,
} from 'appraisejs-proptypes/redux';
import { FETCHED, UNFETCHED } from 'appraisejs-utils/redux';

class Repository extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.verifyRequiredData();
  }

  componentDidUpdate() {
    this.verifyRequiredData();
  }

  updateSearchParams() {
    const { location } = this.props;
    const { installationId, repositoryId } = parse(location.search);

    this.installationId = installationId;
    this.repositoryId = repositoryId;
  }

  // commits -> repositories -> reposByInstallation -> installations
  verifyRequiredData() {
    const {
      fetchInstallations,
      fetchReposInInstallation,
      installations,
      reposByInstallation,
    } = this.props;

    switch (installations.status) {
      case FETCHED:
        if (this.repositoryId && this.installationId) {
          // Check if repositoryId exists or it just hasn't been fetched yet
          switch (reposByInstallation[this.installationId].status) {
            case FETCHED:
              if (reposByInstallation[this.installationId].data.includes(this.repositoryId)) {
                // Check if commits have been fetched for this repository
              }
              break;
            case UNFETCHED:
              fetchReposInInstallation(this.installationId);
              break;
            default:
          }
        }
        break;
      case UNFETCHED:
        fetchInstallations();
        break;
      default:
    }
  }

  render() {
    this.updateSearchParams();
    const { loading } = this.state;

    return (
      <div className="page repository">
        <div className="page-container">
          <h1>Repository</h1>
        </div>
      </div>
    );
  }
}

Repository.propTypes = {
  ...routePropTypes,
  fetchInstallations: PropTypes.func.isRequired,
  fetchReposInInstallation: PropTypes.func.isRequired,
  installations: PropTypes.exact({
    data: PropTypes.objectOf(
      PropTypes.exact(installationPropTypes),
    ),
    error: PropTypes.string,
    status: statusPropType.isRequired,
  }).isRequired,
  reposByInstallation: PropTypes.objectOf(
    PropTypes.exact({
      data: PropTypes.arrayOf(PropTypes.string),
      error: PropTypes.string,
      status: statusPropType.isRequired,
    }),
  ).isRequired,
  repositories: PropTypes.objectOf(
    PropTypes.exact(repositoryPropTypes),
  ).isRequired,
};

export default Repository;
