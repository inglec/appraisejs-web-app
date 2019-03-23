import { connect } from 'react-redux';

import Login from 'appraisejs-components/Login';
import { selectIsAuthenticated } from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
});

export default connect(mapStateToProps)(Login);
