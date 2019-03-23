import { connect } from 'react-redux';

import Callback from 'appraisejs-components/Callback';
import { createLogin } from 'appraisejs-redux/actions';
import { selectIsAuthenticated } from 'appraisejs-redux/selectors';

const mapDispatchToProps = dispatch => ({
  onReceiveAccessToken: (type, token) => dispatch(createLogin(type, token)),
});

const mapStateToProps = state => ({ hasAccessToken: selectIsAuthenticated(state) });

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
