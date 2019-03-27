import { zip } from 'lodash/array';
import PropTypes from 'prop-types';
import randomColour from 'randomcolor';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import './styles';

const createAttemptName = i => `Attempt ${i + 1}`;

const createRunName = i => `Run ${i + 1}`;

const AttemptsGraph = ({ attempts }) => {
  // Get transpose of 2D array
  const attemptsByRun = zip(...attempts);

  const data = attemptsByRun.map((runAttempts, runIndex) => ({
    name: createRunName(runIndex),
    ...runAttempts.reduce((acc, attempt, attemptIndex) => {
      acc[createAttemptName(attemptIndex)] = attempt ? attempt.time : null;
      return acc;
    }, {}),
  }));

  const lines = attempts.map((attempt, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Line key={i} dataKey={createAttemptName(i)} type="monotone" stroke={randomColour()} />
  ));

  return (
    <div className="attemptsgraph">
      <LineChart data={data} width={600} height={400}>
        <XAxis dataKey="name" label="runs" />
        <YAxis label="time" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    </div>
  );
};

/* eslint-disable react/forbid-prop-types */
AttemptsGraph.propTypes = {
  attempts: PropTypes.array.isRequired,
};

export default AttemptsGraph;
