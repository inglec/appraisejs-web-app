import { map } from 'lodash/collection';
import { mapValues } from 'lodash/object';
import PropTypes from 'prop-types';
import React from 'react';

import BenchmarkGraph from 'appraisejs-components/BenchmarkGraph';

const renderBenchmarkGraph = (testsByCommit) => {
  // Get average of min run time
  const getTestValue = (test) => {
    const mins = test.attempts.map((runs) => {
      // Get the lowest time of any run in the attempt
      const runTimes = runs
        .filter(run => run.time)
        .map(run => run.time);

      return Math.min(...runTimes);
    });

    // Get average of min run times for all attempts
    return mins.reduce((acc, time) => acc + time, 0) / mins.length;
  };

  const data = mapValues(testsByCommit, (tests) => {
    const testValues = map(tests, getTestValue);

    // Get average test value
    return testValues.reduce((acc, avgMin) => acc + avgMin, 0) / testValues.length;
  });

  return <BenchmarkGraph commits={data} />;
};

const Benchmark = ({ testsByCommit }) => (
  <div className="repository-page benchmark">
    {renderBenchmarkGraph(testsByCommit)}
  </div>
);

Benchmark.propTypes = {
  benchmarkId: PropTypes.string.isRequired,
  testsByCommit: PropTypes.object.isRequired,
};

export default Benchmark;
