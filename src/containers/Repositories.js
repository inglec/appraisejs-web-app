import { connect } from 'react-redux';

import Repositories from 'appraisejs-components/Repositories';
import { fetchInstallations, fetchReposInInstallation } from 'appraisejs-redux/actions';
import {
  selectInstallations,
  selectReposByInstallation,
  selectRepositories,
} from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  installations: selectInstallations(state),
  reposByInstallation: selectReposByInstallation(state),
  repositories: selectRepositories(state),
});

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
  fetchReposInInstallation: installationId => dispatch(fetchReposInInstallation(installationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
