import { zip } from 'lodash/array';
import PropTypes from 'prop-types';
import randomColour from 'randomcolor';
import React from 'react';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const createAttemptName = i => `Attempt ${i + 1}`;

const createRunName = i => `Run ${i + 1}`;

const chartProps = {
  margin: {
    bottom: 20,
    left: 50,
    right: 50,
  },
};

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

  const lines = attempts.map((attempt, i) => {
    const colour = randomColour({ luminosity: 'dark' });
    const dataKey = createAttemptName(i);

    // eslint-disable-next-line react/no-array-index-key
    return <Line key={i} dataKey={dataKey} type="monotone" stroke={colour} />;
  });

  return (
    <div className="attemptsgraph">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} {...chartProps}>
          <XAxis dataKey="name">
            <Label value="Runs" position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="Time (ns)" position="left" angle={-90} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/* eslint-disable react/forbid-prop-types */
AttemptsGraph.propTypes = {
  attempts: PropTypes.array.isRequired,
};

export default AttemptsGraph;
