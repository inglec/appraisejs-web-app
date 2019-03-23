import { connect } from 'react-redux';

import Home from 'appraisejs-components/Home';
import { selectIsAuthenticated } from 'appraisejs-redux/selectors';

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
});

export default connect(mapStateToProps)(Home);
