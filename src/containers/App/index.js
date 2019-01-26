import { connect } from 'react-redux';

import App from 'appraisejs-modules/App';

const mapStateToProps = state => ({
  isAuthorised: state.authorisation.token !== null && state.authorisation.tokenType !== null,
});

export default connect(mapStateToProps)(App);
