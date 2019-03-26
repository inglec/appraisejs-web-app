import { connect } from 'react-redux';

import Repositories from 'appraisejs-components/Repositories';
import { fetchInstallations, fetchRepositoryIdsByInstallation } from 'appraisejs-redux/actions';
import {
  selectInstallations,
  selectRepositoryIdsByInstallation,
  selectRepositories,
} from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  installations: selectInstallations(state),
  repositoryIdsByInstallation: selectRepositoryIdsByInstallation(state),
  repositories: selectRepositories(state),
});

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
  fetchRepositoryIdsByInstallation: installationId => (
    dispatch(fetchRepositoryIdsByInstallation(installationId))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
