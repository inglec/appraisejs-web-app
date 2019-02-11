import { connect } from 'react-redux';

import Installations from 'appraisejs-components/Installations';
import { fetchInstallations } from 'appraisejs-redux/actions';

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
});

const mapStateToProps = state => ({
  installations: state.installations.data,
  isLoaded: state.installations.isFetching === false,
});

export default connect(mapStateToProps, mapDispatchToProps)(Installations);
