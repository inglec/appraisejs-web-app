import { connect } from 'react-redux';

import Repository from 'appraisejs-components/Repository';
import {
  fetchInstallations,
  fetchReposInInstallation,
  fetchTestsInRepository,
} from 'appraisejs-redux/actions';
import {
  selectInstallations,
  selectReposByInstallation,
  selectRepositories,
  selectTests,
  selectTestsByRepository,
} from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  installations: selectInstallations(state),
  reposByInstallation: selectReposByInstallation(state),
  repositories: selectRepositories(state),
  tests: selectTests(state),
  testsByRepository: selectTestsByRepository(state),
});

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
  fetchReposInInstallation: installationId => dispatch(fetchReposInInstallation(installationId)),
  fetchTestsInRepository: repositoryId => dispatch(fetchTestsInRepository(repositoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
