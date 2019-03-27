import PropTypes from 'prop-types';
import React from 'react';

import AttemptsGraph from 'appraisejs-components/AttemptsGraph';
import AttemptsTable from 'appraisejs-components/AttemptsTable';

import './styles';

const BenchmarkTest = ({ benchmarkId, test }) => {
  const { attempts } = test.benchmarks[benchmarkId];

  return (
    <div className="repository-page benchmark-test">
      <AttemptsGraph attempts={attempts} />
      <AttemptsTable attempts={attempts} />
    </div>
  );
};

/* eslint-disable react/forbid-prop-types */
BenchmarkTest.propTypes = {
  benchmarkId: PropTypes.string.isRequired,
  test: PropTypes.any.isRequired,
};

export default BenchmarkTest;
