import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
            // Store access token.
            this.props.onReceivedAccessToken(response.data.token_type, response.data.access_token);
            this.props.history.push('/');
          }
          else {
            console.error('Error retrieving access token from server. Response: ', response.data);
          }
        })
        .catch(console.error);
    } else {
      console.error('No code passed in URL parameters.')
      this.props.history.push('/');
    }
  }

  render() {
    return <p>Please wait while we retrieve your access token...</p>;
  }
};

Callback.propTypes = {
  onReceivedAccessToken: PropTypes.func.isRequired,
};

export default Callback;
