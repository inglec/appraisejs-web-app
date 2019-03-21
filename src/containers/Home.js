import { connect } from 'react-redux';

import Home from 'appraisejs-components/Home';
import { selectAuth } from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  isAuthenticated: !!selectAuth(state).token,
});

export default connect(mapStateToProps)(Home);
