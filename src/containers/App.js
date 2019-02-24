import { connect } from 'react-redux';

import App from 'appraisejs-components/App';
import { selectAuth } from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({ isAuthenticated: !!selectAuth(state).token });

export default connect(mapStateToProps)(App);
