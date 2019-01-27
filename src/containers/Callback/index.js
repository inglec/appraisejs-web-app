import React from 'react';
import { connect } from 'react-redux';

import Callback from 'appraisejs-modules/Callback';
import { setAuthentication } from 'appraisejs-redux/actions';

const mapDispatchToProps = dispatch => ({
  onReceiveAccessToken: (type, token) => dispatch(setAuthentication(type, token)),
});

const mapStateToProps = state => ({
  receivedAccessToken: state.authentication.token !== null,
});

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
