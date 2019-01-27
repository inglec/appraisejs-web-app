import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import config from 'appraisejs-root/config';

class Callback extends Component {
  constructor(props) {
    super(props);

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    this.state = { code };
  }

  componentDidMount() {
    if (this.state.code) {
      axios
        .post(`${config.serverUrl}/authenticate`, { code: this.state.code })
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
    return this.props.receivedAccessToken
      ? <Redirect to='/'/>
      : <p>Please wait while we retrieve your access token...</p>;
  }
};

Callback.propTypes = {
  receivedAccessToken: PropTypes.bool.isRequired,
  onReceiveAccessToken: PropTypes.func.isRequired,
};

export default Callback;
