import React from 'react';

import { propTypesRouteComponent } from 'appraisejs-proptypes/react_router';

const NotFound = () => (
  <div className="page notfound">
    <div className="page-container">
      404: Page not found
    </div>
  </div>
);

NotFound.propTypes = propTypesRouteComponent;

export default NotFound;
