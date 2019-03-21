import { connect } from 'react-redux';

import Login from 'appraisejs-components/Login';
import { selectAuth } from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  isAuthenticated: !!selectAuth(state).token,
});

export default connect(mapStateToProps)(Login);
