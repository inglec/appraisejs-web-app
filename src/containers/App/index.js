import { connect } from 'react-redux';

import App from 'appraisejs-modules/App';

const mapStateToProps = state => ({
  isAuthenticated: !(state.authentication.token === null || state.authentication.tokenType === null),
});

export default connect(mapStateToProps)(App);
