import PropTypes from 'prop-types';

const computedMatchPropTypes = {
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const locationPropTypes = {
  hash: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,

  key: PropTypes.string,
  state: PropTypes.shape({ from: PropTypes.object }),
};

const historyPropTypes = {
  action: PropTypes.string.isRequired,
  block: PropTypes.func.isRequired,
  createHref: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  listen: PropTypes.func.isRequired,
  location: PropTypes.exact(locationPropTypes).isRequired,
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
};

const matchPropTypes = {
  params: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,

  isExact: PropTypes.bool,
};

export const routePropTypes = {
  match: PropTypes.exact(matchPropTypes).isRequired,
  location: PropTypes.exact(locationPropTypes).isRequired,
  history: PropTypes.exact(historyPropTypes).isRequired,

  computedMatch: PropTypes.exact(computedMatchPropTypes),
};
