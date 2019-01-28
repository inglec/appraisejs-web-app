import React from 'react';
import { connect } from 'react-redux';

import Repositories from 'appraisejs-components/Repositories';
import {
  fetchRepositories,
  selectRepository,
} from 'appraisejs-redux/actions';

const mapDispatchToProps = dispatch => ({
  fetchRepositories: installationId => dispatch(fetchRepositories(installationId)),
});

const mapStateToProps = (state) => {
  const wasRequested = state.selectedInstallation in state.repositoriesByInstallation;
  const repositories = wasRequested
    ? state.repositoriesByInstallation[state.selectedInstallation]
    : {};
  const isLoaded = wasRequested && !repositories.isFetching;

  return {
    repositories,
    selectedInstallation: state.selectedInstallation,
    isLoaded,
    wasRequested,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
