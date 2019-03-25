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
import 'react-perfect-scrollbar/dist/css/styles';

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

  renderList() {
    const { benchmarks, onSelectBenchmark, selected } = this.props;
    return (
      <ListGroup>
        {
          map(benchmarks, (benchmark, benchmarkId) => (
            <ListGroup.Item
              key={benchmarkId}
              active={selected === benchmarkId}
              onClick={() => onSelectBenchmark(benchmarkId)}
            >
              {benchmarkId}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    );
  }

  renderTree() {
    const { benchmarksByFilepath } = this.props;

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

    const data = formatTree(benchmarksByFilepath);

    return <Tree data={data} />;
  }

  renderBenchmark() {
    const { benchmarks, selected } = this.props;
    const { benchmarkDefinition, filepath } = benchmarks[selected] || {};

    if (!selected) {
      return <div className="unselected">Select a benchmark to begin</div>;
    }

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

  render() {
    const { treeBrowser } = this.state;
    return (
      <div className="benchmark-browser">
        <Card className="browser-container">
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
                      <IconedText icon={ListIcon}>List</IconedText>
                    </Button>
                    <Button
                      variant="outline-primary"
                      active={treeBrowser}
                      onClick={() => this.setState({ treeBrowser: true })}
                    >
                      <IconedText icon={TreeIcon}>Tree</IconedText>
                    </Button>
                  </ButtonGroup>
                </div>
                <Scrollbar>
                  {treeBrowser ? this.renderTree() : this.renderList()}
                </Scrollbar>
              </Col>
              <Col>
                {this.renderBenchmark()}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

BenchmarkBrowser.propTypes = {
  benchmarks: PropTypes.object.isRequired,
  benchmarksByFilepath: PropTypes.object.isRequired,
  onSelectBenchmark: PropTypes.func.isRequired,

  selected: PropTypes.string,
};

BenchmarkBrowser.defaultProps = {
  selected: '',
};

export default BenchmarkBrowser;
