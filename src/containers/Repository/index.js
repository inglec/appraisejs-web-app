import { connect } from 'react-redux';

import Repository from 'appraisejs-components/Repository';

const mapStateToProps = state => ({ repositories: state.repositories });

export default connect(mapStateToProps)(Repository);
