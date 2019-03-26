import { connect } from 'react-redux';

import Repository from 'appraisejs-components/Repository';
import {
  fetchInstallations,
  fetchRepositoryIdsByInstallation,
  fetchTestsInRepository,
} from 'appraisejs-redux/actions';
import {
  selectBenchmarksByCommit,
  selectBenchmarkIdsByFilepath,
  selectBenchmarkIdsByRepository,
  selectCommitIdsByBenchmark,
  selectInstallations,
  selectRepositoryIdsByInstallation,
  selectRepositories,
  selectTests,
  selectTestIdsByBenchmark,
  selectTestIdsByCommit,
  selectTestIdsByRepository,
} from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  benchmarksByCommit: selectBenchmarksByCommit(state),
  benchmarkIdsByFilepath: selectBenchmarkIdsByFilepath(state),
  benchmarkIdsByRepository: selectBenchmarkIdsByRepository(state),
  commitIdsByBenchmark: selectCommitIdsByBenchmark(state),
  installations: selectInstallations(state),
  repositoryIdsByInstallation: selectRepositoryIdsByInstallation(state),
  repositories: selectRepositories(state),
  tests: selectTests(state),
  testIdsByBenchmark: selectTestIdsByBenchmark(state),
  testIdsByCommit: selectTestIdsByCommit(state),
  testIdsByRepository: selectTestIdsByRepository(state),
});

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
  fetchRepositoryIdsByInstallation: installationId => (
    dispatch(fetchRepositoryIdsByInstallation(installationId))
  ),
  fetchTestsInRepository: repositoryId => dispatch(fetchTestsInRepository(repositoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
