import { connect } from 'react-redux';

import Login from 'appraisejs-components/Login';

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.token !== null,
});

export default connect(mapStateToProps)(Login);
