import PropTypes from 'prop-types';
import { parse } from 'query-string';
import React, { PureComponent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

import Spinner from 'appraisejs-components/Spinner';
import { routePropTypes } from 'appraisejs-proptypes/react_router';
import { getAccessToken } from 'appraisejs-utils/github_api';

import './styles';

class Callback extends PureComponent {
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
            error_description: errorDescription,
            token_type: tokenType,
          } = response.data;

          if (accessToken && tokenType) {
            onReceiveAccessToken(tokenType, accessToken);
          } else {
            // eslint-disable-next-line no-console
            console.error(response.data);

            const error = errorDescription || 'No access token was returned by the server.';
            this.setState({ error });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          this.setState({ error: 'An error occurred when requesting your access token.' });
        });
    } else {
      this.setState({ error: 'No code was passed to the URL parameters.' });
    }
  }

  render() {
    const { error } = this.state;
    const { hasAccessToken } = this.props;

    if (hasAccessToken) {
      return <Redirect to="/" />;
    }

    return (
      <div className="page callback">
        <div>
          <Card className="statuscard">
            <Card.Body>
              <Card.Title>Logging You In via GitHub</Card.Title>
              {
                error
                  ? <Alert variant="danger">{error}</Alert>
                  : <Card.Text>Please wait while we retrieve your access token</Card.Text>
              }
              {error ? null : <Spinner /> }
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

Callback.propTypes = {
  ...routePropTypes,
  hasAccessToken: PropTypes.bool.isRequired,
  onReceiveAccessToken: PropTypes.func.isRequired,
};

export default Callback;
