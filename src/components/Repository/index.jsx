import { get } from 'lodash/object';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import React, { PureComponent } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { routePropTypes } from 'appraisejs-proptypes/react_router';
import {
  installationPropTypes,
  repositoryPropTypes,
  statusPropType,
  testPropTypes,
} from 'appraisejs-proptypes/redux';
import { FETCHED, UNFETCHED } from 'appraisejs-utils/redux';

import BenchmarkTest from './pages/BenchmarkTest';
import StateSelector from './StateSelector';

import './styles';

class Repository extends PureComponent {
  constructor(props) {
    super(props);
    this.updateSearchParams();

    this.state = {
      benchmarkId: '',
      commitId: '',
      loading: true,
      testId: '',
    };
  }

  componentDidMount() {
    this.verifyRequiredData();
  }

  componentDidUpdate() {
    this.verifyRequiredData();
  }

  onSelectId(id, value) {
    this.setState(prevState => ({ [id]: prevState[id] === value ? '' : value }));
  }

  updateSearchParams() {
    const { location } = this.props;
    const { installationId, repositoryId } = parse(location.search);

    this.installationId = installationId;
    this.repositoryId = repositoryId;
  }

  verifyRequiredData() {
    const {
      fetchInstallations,
      fetchRepositoryIdsByInstallation,
      fetchTestsInRepository,
      installations,
      repositoryIdsByInstallation,
      testIdsByRepository,
    } = this.props;

    switch (installations.status) {
      case FETCHED:
        if (this.repositoryId && this.installationId) {
          // Check if repositoryId exists or it just hasn't been fetched yet
          const installationRepositories = repositoryIdsByInstallation[this.installationId];
          switch (installationRepositories.status) {
            case FETCHED:
              if (installationRepositories.data.includes(this.repositoryId)) {
                // Check if tests have been fetched for this repository
                switch (testIdsByRepository[this.repositoryId].status) {
                  case FETCHED:
                    this.setState({ loading: false });
                    break;
                  case UNFETCHED:
                    fetchTestsInRepository(this.repositoryId);
                    break;
                  default:
                }
              }
              break;
            case UNFETCHED:
              fetchRepositoryIdsByInstallation(this.installationId);
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

  renderStateSelector() {
    const { benchmarkId, commitId, testId } = this.state;
    const {
      benchmarkIdsByFilepath,
      benchmarkIdsByRepository,
      benchmarksByCommit,
      commitIdsByBenchmark,
      testIdsByBenchmark,
      testIdsByCommit,
      testIdsByRepository,
      tests,
    } = this.props;

    return (
      <StateSelector
        benchmarkId={benchmarkId}
        benchmarkIds={benchmarkIdsByRepository[this.repositoryId]}
        benchmarkIdsByFilepath={benchmarkIdsByFilepath[this.repositoryId]}
        benchmarksByCommit={benchmarksByCommit[this.repositoryId]}
        commitId={commitId}
        commitIdsByBenchmark={commitIdsByBenchmark[this.repositoryId]}
        onSelectBenchmarkId={id => this.onSelectId('benchmarkId', id)}
        onSelectCommitId={id => this.onSelectId('commitId', id)}
        onSelectTestId={id => this.onSelectId('testId', id)}
        testId={testId}
        testIds={testIdsByRepository[this.repositoryId].data}
        testIdsByBenchmark={testIdsByBenchmark[this.repositoryId]}
        testIdsByCommit={testIdsByCommit[this.repositoryId]}
        tests={tests}
      />
    );
  }

  renderConditionalContent() {
    const { benchmarkId, commitId, testId } = this.state;
    const { tests } = this.props;

    // TODO: Add more pages by matching more combinations
    if (benchmarkId) {
      if (commitId) {
        if (testId) {
          return <BenchmarkTest benchmarkId={benchmarkId} test={tests[testId]} />;
        }
      }
    }

    return (
      <Jumbotron>
        <h1>Select More Options</h1>
        <p>There is currently nothing to display for this configuration</p>
      </Jumbotron>
    );
  }

  render() {
    this.updateSearchParams();

    const { loading } = this.state;
    const { repositories } = this.props;

    return (
      <div className="page repository">
        <div className="page-container">
          <h1>
            Repository
            {' '}
            {get(repositories, [this.repositoryId, 'name'])}
          </h1>
          {
            loading
              ? <p>Loading...</p>
              : (
                <div>
                  {this.renderStateSelector()}
                  {this.renderConditionalContent()}
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

Repository.propTypes = {
  ...routePropTypes,
  benchmarkIdsByFilepath: PropTypes.objectOf( // repositoryId
    PropTypes.objectOf( // commitId
      PropTypes.object,
    ),
  ).isRequired,
  benchmarkIdsByRepository: PropTypes.objectOf( // repositoryId
    PropTypes.arrayOf(PropTypes.string), // benchmarkIds
  ).isRequired,
  fetchInstallations: PropTypes.func.isRequired,
  fetchRepositoryIdsByInstallation: PropTypes.func.isRequired,
  installations: PropTypes.exact({
    status: statusPropType.isRequired,

    data: PropTypes.objectOf(
      PropTypes.exact(installationPropTypes),
    ),
    error: PropTypes.string,
  }).isRequired,
  repositoryIdsByInstallation: PropTypes.objectOf(
    PropTypes.exact({
      status: statusPropType.isRequired,

      data: PropTypes.arrayOf(PropTypes.string),
      error: PropTypes.string,
    }),
  ).isRequired,
  repositories: PropTypes.objectOf(
    PropTypes.exact(repositoryPropTypes),
  ).isRequired,
  tests: PropTypes.objectOf(
    PropTypes.exact(testPropTypes),
  ).isRequired,
  testIdsByBenchmark: PropTypes.objectOf( // repositoryId
    PropTypes.objectOf( // benchmarkId
      PropTypes.arrayOf(PropTypes.string), // testIds,
    ),
  ),
  testIdsByRepository: PropTypes.objectOf(
    PropTypes.exact({
      status: statusPropType.isRequired,

      data: PropTypes.arrayOf(PropTypes.string),
      error: PropTypes.string,
    }),
  ).isRequired,
};

export default Repository;
