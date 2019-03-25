import { map } from 'lodash/collection';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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
        <Scrollbar>
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
        </Scrollbar>
      </ListGroup>
    );
  }

  renderBenchmark() {
    const { benchmarks, selected } = this.props;
    const { benchmarkDefinition, filepath } = benchmarks[selected] || {};

    return (
      <div>
        {filepath}
        {JSON.stringify(benchmarkDefinition, null, 2)}
      </div>
    );
  }

  render() {
    const { treeBrowser } = this.state;
    return (
      <div className="benchmark-browser">
        <Card>
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
                {treeBrowser ? null : this.renderList()}
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
