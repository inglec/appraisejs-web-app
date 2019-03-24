import { connect } from 'react-redux';

import Repositories from 'appraisejs-components/Repositories';
import { fetchInstallations, fetchReposInInstallation } from 'appraisejs-redux/actions';
import {
  selectInstallations,
  selectReposByInstallation,
  selectRepositories,
} from 'appraisejs-redux/selectors';

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
  fetchReposInInstallation: installationId => dispatch(fetchReposInInstallation(installationId)),
});

const mapStateToProps = state => ({
  installations: selectInstallations(state),
  reposByInstallation: selectReposByInstallation(state),
  repositories: selectRepositories(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
