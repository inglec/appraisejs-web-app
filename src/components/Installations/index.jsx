import { map } from 'lodash/collection';
import { isEmpty } from 'lodash/lang';
import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import RepositoriesIcon from 'react-feather/dist/icons/book-open';
import SettingsIcon from 'react-feather/dist/icons/settings';
import { ScaleLoader as Loader } from 'react-spinners';

import IconedText from 'appraisejs-components/IconedText';
import { routePropTypes } from 'appraisejs-proptypes/react_router';
import { installationPropTypes, statusPropType } from 'appraisejs-proptypes/redux';
import { FETCHED, UNFETCHED } from 'appraisejs-utils/redux';

import { urls } from 'appraisejs-root/config';

import './styles';

class Installations extends PureComponent {
  componentDidMount() {
    const { fetchInstallations, installations } = this.props;

    if (installations.status === UNFETCHED) {
      fetchInstallations();
    }
  }

  renderInstallation(installationId, { account, appId }) {
    const { history } = this.props;
    const { login, htmlUrl } = account;
    const link = {
      pathname: '/repositories',
      search: stringify({ installationId }),
    };

    return (
      <Tab.Pane key={installationId} eventKey={installationId} className="installation">
        <div className="section">
          <div>
            <b>App ID</b>
            {': '}
            {appId}
          </div>
          <div>
            <b>Installed by</b>
            {': '}
            <a href={htmlUrl} target="_blank" rel="noopener noreferrer">{login}</a>
          </div>
        </div>
        <div className="section">
          <Button onClick={() => history.push(link)}>
            <IconedText icon={RepositoriesIcon}>View Repositories</IconedText>
          </Button>
        </div>
        <Card>
          <Card.Body>
            <Card.Title>Configure Installation</Card.Title>
            <Card.Text>
              You can add or remove repositories for this installation.
              You can also remove this installation from
              {' '}
              <b>Appraise.js</b>
              .
            </Card.Text>
            <Button
              href={`https://github.com/settings/installations/${installationId}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-secondary"
            >
              <IconedText icon={SettingsIcon}>Configure Installation</IconedText>
            </Button>
          </Card.Body>
        </Card>
      </Tab.Pane>
    );
  }

  renderInstallations() {
    const { installations } = this.props;

    if (installations.status !== FETCHED) {
      return (
        <div className="loader-container centered">
          <Loader height={100} margin="5px" radius={500} color="cornflowerblue" />
        </div>
      );
    }

    return (
      <Card className="installations-container">
        <Card.Body>
          <Tab.Container defaultActiveKey={Object.keys(installations.data)[0]}>
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {
                    map(installations.data, (installation, installationId) => (
                      <Nav.Link key={installationId} eventKey={installationId}>
                        {installationId}
                      </Nav.Link>
                    ))
                }
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {
                    map(installations.data, (installation, installationId) => (
                      this.renderInstallation(installationId, installation)
                    ))
                  }
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    );
  }

  render() {
    const { installations } = this.props;

    return (
      <div className="page installations">
        <div className="page-container">
          <h1>My Installations</h1>
          {this.renderInstallations()}
          {
            installations.status === FETCHED && isEmpty(installations.data)
              ? (
                <a href={urls.github.appraisejs} target="_blank" rel="noopener noreferrer">
                  Install Appraise.js
                </a>
              )
              : null
          }
        </div>
      </div>
    );
  }
}

Installations.propTypes = {
  ...routePropTypes,
  fetchInstallations: PropTypes.func.isRequired,
  installations: PropTypes.exact({
    data: PropTypes.objectOf(
      PropTypes.exact(installationPropTypes),
    ),
    error: PropTypes.string,
    status: statusPropType.isRequired,
  }).isRequired,
};

export default Installations;
