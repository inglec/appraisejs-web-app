import PropTypes from 'prop-types';
import React from 'react';

import AttemptsTable from 'appraisejs-components/AttemptsTable';

const BenchmarkTest = ({ benchmarkId, test }) => (
  <div className="page">
    <AttemptsTable attempts={test.benchmarks[benchmarkId].attempts} />
  </div>
);

/* eslint-disable react/forbid-prop-types */
BenchmarkTest.propTypes = {
  benchmarkId: PropTypes.string.isRequired,
  test: PropTypes.any.isRequired,
};

export default BenchmarkTest;
