import { connect } from 'react-redux';

import Login from 'appraisejs-components/Login';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Login);
