import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getAccessToken } from 'appraisejs-utils/githubApi.js';

class Callback extends Component {
  constructor(props) {
    super(props);

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    this.state = { code };
  }

  componentDidMount() {
    if (this.state.code) {
      getAccessToken(this.state.code)
        .then(({ token, type }) => {
          // Store access token.
          this.props.onReceivedAccessToken(type, token);
          this.props.history.push('/');
        })
        .catch(err => console.log(err));
    } else {
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
