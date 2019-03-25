import { get } from 'lodash/object';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import React, { PureComponent } from 'react';

import BenchmarkBrowser from 'appraisejs-components/BenchmarkBrowser';
import { routePropTypes } from 'appraisejs-proptypes/react_router';
import {
  installationPropTypes,
  repositoryPropTypes,
  statusPropType,
  testPropTypes,
  testsByBenchmarkPropTypes,
} from 'appraisejs-proptypes/redux';
import { FETCHED, UNFETCHED } from 'appraisejs-utils/redux';

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

  updateSearchParams() {
    const { location } = this.props;
    const { installationId, repositoryId } = parse(location.search);

    this.installationId = installationId;
    this.repositoryId = repositoryId;
  }

  verifyRequiredData() {
    const { commitId, loading, testId } = this.state;
    const {
      benchmarksByFilepath,
      fetchInstallations,
      fetchRepositoriesByInstallation,
      fetchTestsInRepository,
      installations,
      repositoriesByInstallation,
      testsByRepository,
    } = this.props;

    switch (installations.status) {
      case FETCHED:
        if (this.repositoryId && this.installationId) {
          // Check if repositoryId exists or it just hasn't been fetched yet
          const installationRepositories = repositoriesByInstallation[this.installationId];
          switch (installationRepositories.status) {
            case FETCHED:
              if (installationRepositories.data.includes(this.repositoryId)) {
                // Check if tests have been fetched for this repository
                switch (testsByRepository[this.repositoryId].status) {
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
              fetchRepositoriesByInstallation(this.installationId);
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

    if (!loading) {
      // TODO: Select by newest
      if (!commitId) {
        this.setState({ commitId: Object.keys(benchmarksByFilepath[this.repositoryId])[0] });
      }
      if (!testId) {
        this.setState({ testId: Object.keys(testsByRepository[this.repositoryId])[0] });
      }
    }
  }

  renderBenchmarks() {
    const { benchmarkId, commitId, loading } = this.state;
    const { benchmarksByFilepath, testsByBenchmark } = this.props;

    if (loading || !commitId) {
      return 'loading...';
    }

    return (
      <BenchmarkBrowser
        benchmarksByFilepath={benchmarksByFilepath[this.repositoryId][commitId]}
        benchmarks={testsByBenchmark[this.repositoryId][commitId]}
        onSelectBenchmark={id => this.setState({ benchmarkId: id })}
        selected={benchmarkId}
      />
    );
  }

  render() {
    const { repositories } = this.props;
    this.updateSearchParams();

    return (
      <div className="page repository">
        <div className="page-container">
          <h1>
            Repository
            {' '}
            {get(repositories, [this.repositoryId, 'name'])}
          </h1>
          {this.renderBenchmarks()}
        </div>
      </div>
    );
  }
}

Repository.propTypes = {
  ...routePropTypes,
  benchmarksByFilepath: PropTypes.objectOf( // repositoryId
    PropTypes.objectOf( // commitId
      PropTypes.object,
    ),
  ).isRequired,
  fetchInstallations: PropTypes.func.isRequired,
  fetchRepositoriesByInstallation: PropTypes.func.isRequired,
  installations: PropTypes.exact({
    status: statusPropType.isRequired,

    data: PropTypes.objectOf(
      PropTypes.exact(installationPropTypes),
    ),
    error: PropTypes.string,
  }).isRequired,
  repositoriesByInstallation: PropTypes.objectOf(
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
  testsByBenchmark: PropTypes.objectOf( // repositoryId
    PropTypes.objectOf( // commitId
      PropTypes.objectOf( // benchmarkId
        PropTypes.exact(testsByBenchmarkPropTypes),
      ),
    ),
  ),
  testsByRepository: PropTypes.objectOf(
    PropTypes.exact({
      status: statusPropType.isRequired,

      data: PropTypes.arrayOf(PropTypes.string),
      error: PropTypes.string,
    }),
  ).isRequired,
};

export default Repository;
