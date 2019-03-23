import { connect } from 'react-redux';

import Navbar from 'appraisejs-components/Navbar';
import { fetchUser, logout } from 'appraisejs-redux/actions';
import { selectIsAuthenticated, selectUser } from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
  user: selectUser(state),
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  onClickLogout: () => dispatch(logout),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
