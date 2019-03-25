import { connect } from 'react-redux';

import Repository from 'appraisejs-components/Repository';
import {
  fetchInstallations,
  fetchReposInInstallation,
  fetchTestsInRepository,
} from 'appraisejs-redux/actions';
import {
  selectBenchmarksByFilepath,
  selectInstallations,
  selectReposByInstallation,
  selectRepositories,
  selectTests,
  selectTestsByBenchmark,
  selectTestsByRepository,
} from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  benchmarksByFilepath: selectBenchmarksByFilepath(state),
  installations: selectInstallations(state),
  reposByInstallation: selectReposByInstallation(state),
  repositories: selectRepositories(state),
  tests: selectTests(state),
  testsByBenchmark: selectTestsByBenchmark(state),
  testsByRepository: selectTestsByRepository(state),
});

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
  fetchReposInInstallation: installationId => dispatch(fetchReposInInstallation(installationId)),
  fetchTestsInRepository: repositoryId => dispatch(fetchTestsInRepository(repositoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
