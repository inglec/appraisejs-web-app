import { connect } from 'react-redux';

import Installations from 'appraisejs-components/Installations';
import { fetchInstallations } from 'appraisejs-redux/actions';
import { selectInstallations } from 'appraisejs-redux/selectors';

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
});

const mapStateToProps = state => ({
  installations: selectInstallations(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Installations);
