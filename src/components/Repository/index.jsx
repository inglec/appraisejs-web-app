import React from 'react';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';

const Repository = ({ match }) => <p>{JSON.stringify(match)}</p>;

Repository.propTypes = reactRouterPropTypes;

export default Repository;
