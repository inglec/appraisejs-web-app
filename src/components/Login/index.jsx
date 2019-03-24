import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

import Spinner from 'appraisejs-components/Spinner';
import { routePropTypes } from 'appraisejs-proptypes/react_router';
import { oAuthUrl } from 'appraisejs-utils/github_api';

import './styles';

class Login extends PureComponent {
  componentDidMount() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      // Redirect user to GitHub client OAuth page
      window.location = oAuthUrl;
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    // Redirect user back if already authenticated
    return isAuthenticated
      ? <Redirect to="/" />
      : (
        <div className="page login">
          <div>
            <Card className="statuscard">
              <Card.Body>
                <Card.Title>Redirecting You to GitHub</Card.Title>
                <Card.Text>This should just take a second</Card.Text>
                <Spinner />
              </Card.Body>
            </Card>
          </div>
        </div>
      );
  }
}

Login.propTypes = {
  ...routePropTypes,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
