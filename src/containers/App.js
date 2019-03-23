import { connect } from 'react-redux';

import App from 'appraisejs-components/App';
import { selectIsAuthenticated } from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({ isAuthenticated: selectIsAuthenticated(state) });

export default connect(mapStateToProps)(App);
