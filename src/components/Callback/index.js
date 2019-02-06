import axios from 'axios';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';
import config from 'appraisejs-root/config';
import { getAccessToken } from 'appraisejs-utils/github_api';

class Callback extends Component {
  constructor(props) {
    super(props);

    const { code } = qs.parse(props.location.search);

    this.state = { code };
  }

  componentDidMount() {
    if (this.state.code) {
      getAccessToken(this.state.code)
        .then((response) => {
          if ('access_token' in response.data) {
            this.props.onReceiveAccessToken(response.data.token_type, response.data.access_token);
          }
          else {
            console.error('Error retrieving access token from server. Response: ', response.data);
          }
        })
        .catch(console.error);
    } else {
      console.error('No code passed in URL parameters.')

    }
  }

  render() {
    return this.props.hasAccessToken
      ? <Redirect to='/'/>
      : <p>Please wait while we retrieve your access token...</p>;
  }
};

Callback.propTypes = {
  ...reactRouterPropTypes,
  hasAccessToken: PropTypes.bool.isRequired,
  onReceiveAccessToken: PropTypes.func.isRequired,
};

export default Callback;
