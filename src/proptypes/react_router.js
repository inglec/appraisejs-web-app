import PropTypes from 'prop-types';

const location = {
  hash: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,

  key: PropTypes.string,
  state: PropTypes.shape({ from: PropTypes.object }),
};

export default {
  history: PropTypes.exact({
    action: PropTypes.string.isRequired,
    block: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    listen: PropTypes.func.isRequired,
    location: PropTypes.exact(location).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.exact(location).isRequired,
  match: PropTypes.exact({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
