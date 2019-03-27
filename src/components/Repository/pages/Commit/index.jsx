import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const renderRetest = (commitId, onClickRetest) => (
  <Card>
    <Card.Body>
      <Card.Title>Retest Commit</Card.Title>
      <Card.Text>
        You can retrigger a test of this repository at commit
        {' '}
        <b>{commitId}</b>
        .
      </Card.Text>
      <Card.Text>You will need to wait a few minutes until results are available.</Card.Text>
      <Button variant="outline-warning" onClick={onClickRetest}>Retest Commit</Button>
    </Card.Body>
  </Card>
);

const Commit = ({ commitId, onClickRetest }) => (
  <div className="repository-page commit">
    {renderRetest(commitId, onClickRetest)}
  </div>
);

Commit.propTypes = {
  commitId: PropTypes.string.isRequired,
  onClickRetest: PropTypes.func.isRequired,
};

export default Commit;
