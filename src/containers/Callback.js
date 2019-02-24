import { connect } from 'react-redux';

import Callback from 'appraisejs-components/Callback';
import { setAuth } from 'appraisejs-redux/actions';
import { selectAuth } from 'appraisejs-redux/selectors';

const mapDispatchToProps = dispatch => ({
  onReceiveAccessToken: (type, token) => dispatch(setAuth(type, token)),
});

const mapStateToProps = state => ({ hasAccessToken: !!selectAuth(state).token });

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
