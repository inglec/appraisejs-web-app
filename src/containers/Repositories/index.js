import React from 'react';
import { connect } from 'react-redux';

import Repositories from 'appraisejs-modules/Repositories';
import {
  fetchRepositories,
  selectRepository,
} from 'appraisejs-redux/actions';

const mapDispatchToProps = dispatch => ({
  fetchRepositories: () => dispatch(fetchRepositories()),
  selectRepository: repository => dispatch(selectRepository(repository)),
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
