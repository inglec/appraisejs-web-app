import PropTypes from 'prop-types';
import React from 'react';
import Table from 'react-bootstrap/Table';
import JsonView from 'react-json-view';

import './styles';

const renderRunHeadings = (runCount) => {
  const headings = [];

  for (let i = 1; i <= runCount; i += 1) {
    headings.push(
      <th key={`run${i}`}>
        Run
        {' '}
        {i}
      </th>,
    );
  }

  return headings;
};

const renderValue = (value) => {
  if (typeof value !== 'object') {
    return value;
  }

  return (
    <JsonView
      src={value}
      enableClipboard={false}
      displayObjectSize={false}
      displayDataTypes={false}
    />
  );
};

const renderRunRows = (runs, maxRows) => {
  const rows = runs.map(({ error, time, value }, i) => (
    <td key={`run${i + 1}`}>
      {
        error
          ? (
            <div className="run-error">
              <b>Error</b>
              {': '}
              {error}
            </div>
          )
          : (
            <div className="run-result">
              {
                value
                  ? (
                    <div className="run-value">
                      <b>Value</b>
                      {': '}
                      {renderValue(value)}
                    </div>
                  )
                  : null
                }
              <div className="run-time">
                <b>Time</b>
                {': '}
                {Number(time).toLocaleString()}
                ns
              </div>
            </div>
          )
      }
    </td>
  ));

  const remainingRows = maxRows - runs.length;

  if (remainingRows > 0) {
    rows.push(<td key="abandoned" colSpan={1 + remainingRows}>-</td>);
  }

  return rows;
};

const AttemptsTable = ({ attempts }) => {
  // Find attempt with max number of runs
  const maxRuns = Math.max(...attempts.map(runs => runs.length));

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Attempt #</th>
          {renderRunHeadings(maxRuns)}
        </tr>
      </thead>
      <tbody>
        {
          attempts.map((runs, i) => (
            <tr key={`attempt${i + 1}`}>
              <td>{i + 1}</td>
              {renderRunRows(runs, maxRuns)}
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

AttemptsTable.propTypes = {
  attempts: PropTypes.array.isRequired,
};

export default AttemptsTable;
