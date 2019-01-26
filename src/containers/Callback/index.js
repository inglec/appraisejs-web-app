import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Callback from 'appraisejs-modules/Callback';
import { setAuthorisation } from 'appraisejs-redux/actions';

const mapDispatchToProps = dispatch => ({
  onReceivedAccessToken: (type, token) => dispatch(setAuthorisation(type, token)),
});

export default withRouter(connect(null, mapDispatchToProps)(Callback));
