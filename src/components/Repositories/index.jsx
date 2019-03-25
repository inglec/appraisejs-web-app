import { forEach, map } from 'lodash/collection';
import PropTypes from 'prop-types';
import { parse, stringify } from 'query-string';
import React, { PureComponent } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BenchmarksIcon from 'react-feather/dist/icons/bar-chart';
import XIcon from 'react-feather/dist/icons/x';

import IconedText from 'appraisejs-components/IconedText';
import { routePropTypes } from 'appraisejs-proptypes/react_router';
import {
  installationPropTypes,
  repositoryPropTypes,
  statusPropType,
} from 'appraisejs-proptypes/redux';
import { FETCHED, UNFETCHED } from 'appraisejs-utils/redux';

import './styles';

class Repositories extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.verifyRequiredData();
  }

  componentDidUpdate() {
    this.verifyRequiredData();
  }

  updateSearchParams() {
    const { location } = this.props;
    const { installationId } = parse(location.search);

    this.installationId = installationId;
  }

  verifyRequiredData() {
    const {
      fetchInstallations,
      fetchReposInInstallation,
      installations,
      reposByInstallation,
    } = this.props;

    switch (installations.status) {
      case FETCHED:
        if (this.installationId) {
          // Fetch repositories for selected installation
          switch (reposByInstallation[this.installationId].status) {
            case FETCHED:
              this.setState({ loading: false });
              break;
            case UNFETCHED:
              fetchReposInInstallation(this.installationId);
              break;
            default:
          }
        } else {
          // Fetch repositories for all installations
          const installationIds = Object.keys(installations.data);
          const unfetchedInstallations = installationIds.filter(id => (
            reposByInstallation[id].status !== FETCHED
          ));

          // Allow component to render if all data has been fetched
          if (unfetchedInstallations.length === 0) {
            this.setState({ loading: false });
          }

          forEach(unfetchedInstallations, (id) => {
            if (reposByInstallation[id].status === UNFETCHED) {
              fetchReposInInstallation(id);
            }
          });
        }
        break;
      case UNFETCHED:
        fetchInstallations();
        break;
      default:
    }
  }

  renderRepository(repositoryId, repository) {
    const { history } = this.props;

    const {
      description,
      htmlUrl,
      name,
      owner,
      private: isPrivate,
    } = repository;

    const { login } = owner;
    const link = {
      pathname: '/repository',
      search: stringify({
        installationId: this.installationId,
        repositoryId,
      }),
    };

    return (
      <Card key={`${owner}/${name}`} className="repository">
        <Card.Body>
          <Card.Title className="name">
            <a href={htmlUrl} target="_blank" rel="noopener noreferrer">{name}</a>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted owner">
            {isPrivate ? <Badge variant="secondary">private</Badge> : null}
            {login}
          </Card.Subtitle>
          <Card.Text className="description">{description}</Card.Text>
          <Button variant="primary" onClick={() => history.push(link)}>
            <IconedText icon={BenchmarksIcon}>View Benchmarks</IconedText>
          </Button>
        </Card.Body>
      </Card>
    );
  }

  renderRepositories() {
    const { loading } = this.state;
    const { reposByInstallation, repositories } = this.props;

    if (loading) {
      return <p>Loading</p>;
    }

    /**
     * Filter repositories to those in the selected installation.
     * If no installation is selected, return all repositories.
     */
    const filteredRepositories = this.installationId
      ? reposByInstallation[this.installationId].data.reduce((acc, repoId) => {
        acc[repoId] = repositories[repoId];
        return acc;
      }, {})
      : repositories;

    return (
      <div className="repositories">
        {
          map(filteredRepositories, (repository, repositoryId) => (
            this.renderRepository(repositoryId, repository)
          ))
        }
      </div>
    );
  }

  render() {
    const { history } = this.props;
    this.updateSearchParams();

    return (
      <div className="page repositories">
        <div className="page-container">
          <h1>My Repositories</h1>
          {
            this.installationId
              ? (
                <span className="selected-installation">
                  <span>Selected installation:</span>
                  <Badge pill variant="danger" onClick={() => history.push('/repositories')}>
                    <IconedText icon={XIcon}>{this.installationId}</IconedText>
                  </Badge>
                </span>
              )
              : null
          }
          {this.renderRepositories()}
        </div>
      </div>
    );
  }
}

Repositories.propTypes = {
  ...routePropTypes,
  fetchInstallations: PropTypes.func.isRequired,
  fetchReposInInstallation: PropTypes.func.isRequired,
  installations: PropTypes.exact({
    status: statusPropType.isRequired,

    data: PropTypes.objectOf(
      PropTypes.exact(installationPropTypes),
    ),
    error: PropTypes.string,
  }).isRequired,
  reposByInstallation: PropTypes.objectOf(
    PropTypes.exact({
      status: statusPropType.isRequired,

      data: PropTypes.arrayOf(PropTypes.string),
      error: PropTypes.string,
    }),
  ).isRequired,
  repositories: PropTypes.objectOf(
    PropTypes.exact(repositoryPropTypes),
  ).isRequired,
};

export default Repositories;
