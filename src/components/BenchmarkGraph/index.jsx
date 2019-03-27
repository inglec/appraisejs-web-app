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

const BenchmarkGraph = ({ commits }) => {
  const data = map(commits, (minTime, commitId) => ({ name: commitId, minTime }));

  return (
    <div className="benchmarkgraph">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} {...chartProps}>
          <XAxis dataKey="name">
            <Label value="Commits" position="bottom" />
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

BenchmarkGraph.propTypes = {
  commits: PropTypes.any.isRequired,
};

export default BenchmarkGraph;
