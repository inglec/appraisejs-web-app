import React from 'react';

import reactRouterPropTypes from 'appraisejs-proptypes/react_router';

const Repository = (props) => {
  return <p>{JSON.stringify(props.match)}</p>;
};

Repository.propTypes = reactRouterPropTypes;

export default Repository;
