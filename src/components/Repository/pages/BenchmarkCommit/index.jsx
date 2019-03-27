import { mapValues } from 'lodash/object';
import PropTypes from 'prop-types';
import React from 'react';

import CommitGraph from 'appraisejs-components/CommitGraph';

const renderCommitGraph = (tests) => {
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

  const data = mapValues(tests, getTestValue);

  return <CommitGraph tests={data} />;
};

const BenchmarkCommit = ({ tests }) => (
  <div className="repository-page benchmark-commit">
    {renderCommitGraph(tests)}
  </div>
);

BenchmarkCommit.propTypes = {
  benchmarkId: PropTypes.string.isRequired,
  commitId: PropTypes.string.isRequired,
  tests: PropTypes.object.isRequired,
};

export default BenchmarkCommit;
