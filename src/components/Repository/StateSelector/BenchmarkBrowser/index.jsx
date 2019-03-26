import { map } from 'lodash/collection';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import TreeIcon from 'react-feather/dist/icons/folder';
import ListIcon from 'react-feather/dist/icons/list';
import Scrollbar from 'react-perfect-scrollbar';

import IconedText from 'appraisejs-components/IconedText';

import Tree from './Tree';

import './styles';

class BenchmarkBrowser extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      treeBrowser: false,
    };
  }

  useTreeBrowser(boolean) {
    if (this.selectedBenchmark) {
      this.setState({ treeBrowser: boolean });
    }
  }

  renderList() {
    const { benchmarkIds, onSelectBenchmarkId, selectedBenchmark } = this.props;
    return (
      <ListGroup>
        <Scrollbar>
          {
            benchmarkIds.map(benchmarkId => (
              <ListGroup.Item
                key={benchmarkId}
                active={selectedBenchmark.benchmarkId === benchmarkId}
                onClick={() => onSelectBenchmarkId(benchmarkId)}
              >
                {benchmarkId}
              </ListGroup.Item>
            ))
          }
        </Scrollbar>
      </ListGroup>
    );
  }

  renderTree() {
    const { benchmarkIdsByFilepath, onSelectBenchmarkId } = this.props;

    const formatTree = (tree, parentPath) => {
      if (Array.isArray(tree)) {
        return tree.map(filename => ({ name: filename }));
      }

      return map(tree, (childTree, directory) => {
        const path = `${parentPath ? `${parentPath}/` : ''}${directory}`;
        return {
          children: formatTree(childTree, path),
          name: directory,
          toggled: true,
        };
      });
    };

    const data = formatTree(benchmarkIdsByFilepath);

    const onClickNode = (node) => {
      if (!node.children) {
        onSelectBenchmarkId(node.name);
      }
    };

    return (
      <Scrollbar>
        <Tree data={data} onClickNode={onClickNode} />
      </Scrollbar>
    );
  }

  renderBenchmark() {
    const { selectedBenchmark } = this.props;

    if (!selectedBenchmark) {
      return <div className="unselected">Select a benchmark to begin</div>;
    }

    const { benchmarkDefinition, filepath } = selectedBenchmark;

    if (benchmarkDefinition && filepath) {
      return (
        <div>
          <Alert variant="info">
            <b>Filepath</b>
            {': '}
            {filepath}
          </Alert>
          <Card>
            <Card.Body>
              <Card.Title>Benchmark Definition</Card.Title>
              {
                map(benchmarkDefinition, (value, key) => (
                  <Card.Text key={key}>
                    <b>{key}</b>
                    {': '}
                    {key === 'timeout' ? `${value}ms` : value}
                  </Card.Text>
                ))
              }
            </Card.Body>
          </Card>
        </div>
      );
    }

    return <p>Cannot render definition</p>;
  }

  render() {
    const { treeBrowser } = this.state;
    return (
      <Card className="benchmarkbrowser">
        <Card.Body>
          <Row>
            <Col>
              <div className="mode">
                <ButtonGroup>
                  <Button
                    variant="outline-primary"
                    active={!treeBrowser}
                    onClick={() => this.setState({ treeBrowser: false })}
                  >
                    <IconedText icon={ListIcon}>Benchmark List</IconedText>
                  </Button>
                  <Button
                    variant="outline-primary"
                    active={treeBrowser}
                    onClick={() => this.setState({ treeBrowser: true })}
                  >
                    <IconedText icon={TreeIcon}>File Tree</IconedText>
                  </Button>
                </ButtonGroup>
              </div>
              {treeBrowser ? this.renderTree() : this.renderList()}
            </Col>
            <Col>
              {this.renderBenchmark()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

BenchmarkBrowser.propTypes = {
  benchmarkIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectBenchmarkId: PropTypes.func.isRequired,

  benchmarkIdsByFilepath: PropTypes.object,
  selectedBenchmark: PropTypes.exact({
    benchmarkId: PropTypes.string.isRequired,

    benchmarkDefinition: PropTypes.object,
    filepath: PropTypes.string,
  }),
};

BenchmarkBrowser.defaultProps = {
  benchmarkIdsByFilepath: null,
  selectedBenchmark: null,
};

export default BenchmarkBrowser;
