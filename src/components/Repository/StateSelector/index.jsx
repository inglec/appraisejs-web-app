import { intersection } from 'lodash/array';
import { get } from 'lodash/object';
import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Scrollbar from 'react-perfect-scrollbar';

import BenchmarkBrowser from 'appraisejs-components/BenchmarkBrowser';

import './styles';

const renderList = (title, items, selectedItem, onSelectItem) => (
  <div className="stateselector-list">
    <h5>{title}</h5>
    <Scrollbar>
      <ListGroup>
        {
          items.map(item => (
            <ListGroup.Item
              key={item}
              active={selectedItem === item}
              onClick={() => onSelectItem(item)}
            >
              {item}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Scrollbar>
  </div>
);

const StateSelector = (props) => {
  const {
    benchmarkId,
    benchmarkIds: allBenchmarkIds,
    benchmarkIdsByFilepath,
    benchmarksByCommit,
    commitId,
    commitIdsByBenchmark,
    onSelectBenchmarkId,
    onSelectCommitId,
    onSelectTestId,
    testId,
    testIds: allTestIds,
    testIdsByBenchmark,
    testIdsByCommit,
    tests,
  } = props;

  let benchmarkIds = allBenchmarkIds;
  if (commitId || testId) {
    const id = testId ? tests[testId].commitId : commitId;
    benchmarkIds = Object.keys(benchmarksByCommit[id]);
  }

  let commitIds = Object.keys(testIdsByCommit);
  if (testId) {
    commitIds = [tests[testId].commitId];
  } else if (benchmarkId) {
    commitIds = commitIdsByBenchmark[benchmarkId];
  }

  let testIds = allTestIds;
  if (benchmarkId) {
    testIds = testIdsByBenchmark[benchmarkId];
  }
  if (commitId) {
    testIds = intersection(testIds, testIdsByCommit[commitId]);
  }

  const selectedBenchmark = {
    benchmarkId,
    ...get(benchmarksByCommit, [commitId, benchmarkId], {}),
  };

  return (
    <Card className="stateselector">
      <Card.Body>
        <div className="stateselector-row stateselector-top">
          {renderList('Commits', commitIds, commitId, onSelectCommitId)}
          {renderList('Tests', testIds, testId, onSelectTestId)}
        </div>
        <div className="stateselector-row stateselector-bottom">
          <div className="benchmarkbrowser-container">
            <h5>Benchmarks</h5>
            <BenchmarkBrowser
              benchmarkIds={benchmarkIds}
              benchmarkIdsByFilepath={get(benchmarkIdsByFilepath, commitId, {})}
              onSelectBenchmarkId={onSelectBenchmarkId}
              selectedBenchmark={selectedBenchmark}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

/* eslint-disable react/forbid-prop-types */
StateSelector.propTypes = {
  benchmarkId: PropTypes.any.isRequired,
  benchmarkIdsByFilepath: PropTypes.any.isRequired,
  benchmarkIds: PropTypes.any.isRequired,
  benchmarksByCommit: PropTypes.any.isRequired,
  commitId: PropTypes.any.isRequired,
  commitIdsByBenchmark: PropTypes.any.isRequired,
  onSelectBenchmarkId: PropTypes.func.isRequired,
  onSelectCommitId: PropTypes.func.isRequired,
  onSelectTestId: PropTypes.func.isRequired,
  testId: PropTypes.any.isRequired,
  testIds: PropTypes.any.isRequired,
  testIdsByBenchmark: PropTypes.any.isRequired,
  testIdsByCommit: PropTypes.any.isRequired,
  tests: PropTypes.any.isRequired,
};

export default StateSelector;
