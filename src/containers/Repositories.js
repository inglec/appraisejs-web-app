import { connect } from 'react-redux';

import Repositories from 'appraisejs-components/Repositories';
import { fetchInstallations, fetchRepositoriesByInstallation } from 'appraisejs-redux/actions';
import {
  selectInstallations,
  selectRepositoriesByInstallation,
  selectRepositories,
} from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  installations: selectInstallations(state),
  repositoriesByInstallation: selectRepositoriesByInstallation(state),
  repositories: selectRepositories(state),
});

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
  fetchRepositoriesByInstallation: installationId => (
    dispatch(fetchRepositoriesByInstallation(installationId))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
