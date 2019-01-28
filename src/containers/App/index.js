import { connect } from 'react-redux';

import App from 'appraisejs-components/App';

const mapStateToProps = state => ({ isAuthenticated: state.authentication.token !== null });

export default connect(mapStateToProps)(App);
