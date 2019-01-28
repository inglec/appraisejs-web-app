import React from 'react';
import { connect } from 'react-redux';

import Callback from 'appraisejs-components/Callback';
import { setAuthentication } from 'appraisejs-redux/actions';

const mapDispatchToProps = dispatch => ({
  onReceiveAccessToken: (type, token) => dispatch(setAuthentication(type, token)),
});

const mapStateToProps = state => ({ hasAccessToken: state.authentication.token !== null });

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
