import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';
import { ClipLoader as Spinner } from 'react-spinners';

import { propTypesRouteComponent } from 'appraisejs-proptypes/react_router';
import { oAuthUrl } from 'appraisejs-utils/github_api';

import './styles';

class Login extends Component {
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
                <div className="spinner">
                  <Spinner color="steelblue" size="80" />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      );
  }
}

Login.propTypes = {
  ...propTypesRouteComponent,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
