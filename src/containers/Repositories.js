import { connect } from 'react-redux';

import Repositories from 'appraisejs-components/Repositories';
import { fetchReposInInstallation } from 'appraisejs-redux/actions';

const mapDispatchToProps = dispatch => ({
  fetchReposInInstallation: installationId => dispatch(fetchReposInInstallation(installationId)),
});

const mapStateToProps = state => ({
  reposByInstallation: state.reposByInstallation.data,
  repositories: state.repositories,
  isLoaded: state.reposByInstallation.isFetching === false,
});

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);