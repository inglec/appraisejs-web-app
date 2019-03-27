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
  const rows = [];
  for (let i = 0; i < maxRows; i += 1) {
    let content = '-';
    if (i < runs.length) {
      const { error, time, value } = runs[i];

      content = error
        ? <div className="run-error">{error}</div>
        : (
          <div className="run-result">
            {value ? <div className="run-value">{renderValue(value)}</div> : null}
            <div className="run-time">
              {time}
              ms
            </div>
          </div>
        );
    }

    rows.push(<td key={`run${i + 1}`}>{content}</td>);
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
        {
          attempts.map((runs, i) => (
            <tr key={`attempt${i + 1}`}>
              <td>{i + 1}</td>
              {renderRunRows(runs, maxRuns)}
            </tr>
          ))
        }
      </thead>
    </Table>
  );
};

AttemptsTable.propTypes = {
  attempts: PropTypes.array.isRequired,
};

export default AttemptsTable;
