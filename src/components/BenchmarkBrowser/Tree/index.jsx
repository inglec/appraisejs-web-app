import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';

import './styles';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: null };
  }

  onToggle(node, toggled) {
    const { selected } = this.state;
    const { onClickNode } = this.props;

    // Unselect last-selected node
    if (selected) {
      selected.active = false;
    }

    onClickNode(node, toggled);

    // eslint-disable-next-line no-param-reassign
    node.active = true;
    if (node.children) {
      // eslint-disable-next-line no-param-reassign
      node.toggled = toggled;
    }

    this.setState({ selected: node });
  }

  render() {
    const { data } = this.props;

    return (
      <div className="tree">
        <Treebeard
          animations={false}
          data={data}
          onToggle={(node, toggled) => this.onToggle(node, toggled)}
        />
      </div>
    );
  }
}

Tree.propTypes = {
  data: PropTypes.array.isRequired,
  onClickNode: PropTypes.func.isRequired,
};

export default Tree;
