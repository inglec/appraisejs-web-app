import { intersection } from 'lodash/array';
import { get } from 'lodash/object';
import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Scrollbar from 'react-perfect-scrollbar';

import BenchmarkBrowser from './BenchmarkBrowser';

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
    benchmarkIdsByFilepath,
    benchmarkIdsByRepository,
    benchmarksByCommit,
    commitId,
    commitIdsByBenchmark,
    onSelectBenchmarkId,
    onSelectCommitId,
    onSelectTestId,
    repositoryId,
    testId,
    testIdsByBenchmark,
    testIdsByCommit,
    testIdsByRepository,
    tests,
  } = props;

  let benchmarkIds = benchmarkIdsByRepository[repositoryId];
  if (commitId || testId) {
    const id = testId ? tests[testId].commitId : commitId;
    benchmarkIds = Object.keys(benchmarksByCommit[repositoryId][id]);
  }

  let commitIds = Object.keys(testIdsByCommit[repositoryId]);
  if (testId) {
    commitIds = [tests[testId].commitId];
  } else if (benchmarkId) {
    commitIds = commitIdsByBenchmark[repositoryId][benchmarkId];
  }

  let testIds = testIdsByRepository[repositoryId].data;
  if (benchmarkId) {
    testIds = testIdsByBenchmark[repositoryId][benchmarkId];
  }
  if (commitId) {
    testIds = intersection(testIds, testIdsByCommit[repositoryId][commitId]);
  }

  const selectedBenchmark = {
    benchmarkId,
    ...get(benchmarksByCommit[repositoryId], [commitId, benchmarkId], {}),
  };

  return (
    <Card className="stateselector">
      <Card.Body>
        <div className="stateselector-row stateselector-top">
          {renderList('Commits', commitIds, commitId, onSelectCommitId)}
          {renderList('Tests', testIds, testId, onSelectTestId)}
        </div>
        <div className="stateselector-row stateselector-bottom">
          <BenchmarkBrowser
            benchmarkIds={benchmarkIds}
            benchmarkIdsByFilepath={get(benchmarkIdsByFilepath[repositoryId], commitId, {})}
            onSelectBenchmarkId={onSelectBenchmarkId}
            selectedBenchmark={selectedBenchmark}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

/* eslint-disable react/forbid-prop-types */
StateSelector.propTypes = {
  benchmarkId: PropTypes.any.isRequired,
  benchmarkIdsByFilepath: PropTypes.any.isRequired,
  benchmarkIdsByRepository: PropTypes.any.isRequired,
  benchmarksByCommit: PropTypes.any.isRequired,
  commitId: PropTypes.any.isRequired,
  commitIdsByBenchmark: PropTypes.any.isRequired,
  onSelectBenchmarkId: PropTypes.func.isRequired,
  onSelectCommitId: PropTypes.func.isRequired,
  onSelectTestId: PropTypes.func.isRequired,
  repositoryId: PropTypes.any.isRequired,
  testId: PropTypes.any.isRequired,
  testIdsByBenchmark: PropTypes.any.isRequired,
  testIdsByCommit: PropTypes.any.isRequired,
  testIdsByRepository: PropTypes.any.isRequired,
  tests: PropTypes.any.isRequired,
};

export default StateSelector;
