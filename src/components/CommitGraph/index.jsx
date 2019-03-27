import { map } from 'lodash/collection';
import PropTypes from 'prop-types';
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

const chartProps = {
  margin: {
    bottom: 20,
    left: 50,
    right: 50,
  },
};

const CommitGraph = ({ tests }) => {
  const data = map(tests, (minTime, testId) => ({ name: testId, minTime }));

  return (
    <div className="commitgraph">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} {...chartProps}>
          <XAxis dataKey="name">
            <Label value="Tests" position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="Minimum Run Time" position="left" angle={-90} />
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="minTime" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

CommitGraph.propTypes = {
  tests: PropTypes.any.isRequired,
};

export default CommitGraph;
