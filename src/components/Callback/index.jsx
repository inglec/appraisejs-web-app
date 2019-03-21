import PropTypes from 'prop-types';
import { parse } from 'query-string';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

import { propTypesRouteComponent } from 'appraisejs-proptypes/react_router';
import { getAccessToken } from 'appraisejs-utils/github_api';

import './styles';

class Callback extends Component {
  constructor(props) {
    super(props);

    const { location } = props;
    const { code } = parse(location.search);

    this.state = { code };
  }

  componentDidMount() {
    const { code } = this.state;
    const { onReceiveAccessToken } = this.props;

    if (code) {
      // Proxy request to GitHub via supervisor
      getAccessToken(code)
        .then((response) => {
          const {
            access_token: accessToken,
            token_type: tokenType,
          } = response.data;

          if (accessToken && tokenType) {
            onReceiveAccessToken(tokenType, accessToken);
          } else {
            // eslint-disable-next-line no-console
            console.error(response.data);
            this.setState({ error: 'No access token was returned by the server' });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          this.setState({ error: 'An error occurred when requesting your access token' });
        });
    } else {
      this.setState({ error: 'No code was passed to the URL parameters' });
    }
  }

  render() {
    const { error } = this.state;
    const { hasAccessToken, history } = this.props;

    if (hasAccessToken) {
      return <Redirect to="/" />;
    }

    return (
      <div className="page callback">
        <div>
          <Card className="statuscard">
            <Card.Body>
              <Card.Title>Logging You In via GitHub</Card.Title>
              {error
                ? <Alert variant="danger">{error}</Alert>
                : <Card.Text>Please wait while we retrieve your access token</Card.Text>
              }
              <Card.Link href="" onClick={() => history.push('/')}>Return Home</Card.Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

Callback.propTypes = {
  ...propTypesRouteComponent,
  hasAccessToken: PropTypes.bool.isRequired,
  onReceiveAccessToken: PropTypes.func.isRequired,
};

export default Callback;
