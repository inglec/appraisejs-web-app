import React from 'react';
import { connect } from 'react-redux';

import Installations from 'appraisejs-modules/Installations';
import {
  fetchInstallations,
  selectInstallation,
} from 'appraisejs-redux/actions';

const mapDispatchToProps = dispatch => ({
  fetchInstallations: () => dispatch(fetchInstallations()),
  selectInstallation: installation => dispatch(selectInstallation(installation)),
});

const mapStateToProps = state => ({
  installations: state.installations.data,
  isLoaded: state.installations.isFetching === false,
});

export default connect(mapStateToProps, mapDispatchToProps)(Installations);
