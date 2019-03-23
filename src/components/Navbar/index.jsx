import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { withRouter } from 'react-router-dom';

import { propTypesRouteComponent } from 'appraisejs-proptypes/react_router';

import './styles';

class AppNavbar extends Component {
  componentDidMount() {
    const { fetchUser, isAuthenticated, user } = this.props;

    if (isAuthenticated && !('state' in user)) {
      fetchUser();
    }
  }

  renderNavLinks() {
    const { history, routes } = this.props;

    return routes.map(({ name, path }) => (
      <Nav.Link key={name} onClick={() => history.push(path)}>{name}</Nav.Link>
    ));
  }

  render() {
    const { history, onClickLogout } = this.props;

    return (
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand onClick={() => history.push('/')}>Appraise.js</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            {this.renderNavLinks()}
          </Nav>
          <Nav>
            <NavDropdown alignRight title="hello">
              <NavDropdown.Item>Option 1</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => onClickLogout()}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

AppNavbar.propTypes = {
  ...propTypesRouteComponent,
  fetchUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClickLogout: PropTypes.func.isRequired,
};

export default withRouter(AppNavbar);
