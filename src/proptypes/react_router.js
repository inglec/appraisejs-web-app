import PropTypes from 'prop-types';

const computedMatch = PropTypes.exact({
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

const location = PropTypes.exact({
  hash: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,

  key: PropTypes.string,
  state: PropTypes.shape({ from: PropTypes.object }),
});

const history = PropTypes.exact({
  action: PropTypes.string.isRequired,
  block: PropTypes.func.isRequired,
  createHref: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  goForward: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  listen: PropTypes.func.isRequired,
  location: location.isRequired,
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
});

const match = PropTypes.exact({
  isExact: PropTypes.bool,
  params: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const propTypesRoute = {
  component: PropTypes.func.isRequired,
  computedMatch: computedMatch.isRequired,
  location: location.isRequired,
  path: PropTypes.string.isRequired,

  exact: PropTypes.bool,
};

export const propTypesRouteComponent = {
  match: match.isRequired,
  location: location.isRequired,
  history: history.isRequired,
};
