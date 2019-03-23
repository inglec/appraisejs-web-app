import { isEmpty } from 'lodash/lang';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { withRouter } from 'react-router-dom';

import { routePropTypes } from 'appraisejs-proptypes/react_router';
import { statusPropType, userPropTypes } from 'appraisejs-proptypes/redux';

import './styles';

class AppNavbar extends Component {
  componentDidMount() {
    this.verifyUser();
  }

  componentDidUpdate() {
    this.verifyUser();
  }

  verifyUser() {
    const { fetchUser, isAuthenticated, user } = this.props;

    if (isAuthenticated && isEmpty(user)) {
      fetchUser();
    }
  }

  renderNavLinks() {
    const { history, location, routes } = this.props;

    return routes.map(({ name, path, exact }) => {
      const regex = new RegExp(`^${path}${exact ? '$' : ''}`);
      const active = !!regex.exec(location.pathname);

      return (
        <Nav.Link
          key={name}
          active={active}
          onClick={() => history.push(path)}
        >
          {name}
        </Nav.Link>
      );
    });
  }

  renderDropdown() {
    const {
      history,
      isAuthenticated,
      onClickLogout,
      user,
    } = this.props;

    const {
      avatarUrl,
      htmlUrl,
      login,
      name,
    } = user.data || {};

    const dropdownTitle = (
      <span className="dropdown-title">
        {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : null}
        <span>{name || login || 'Me'}</span>
      </span>
    );

    return (
      isAuthenticated
        ? (
          <NavDropdown alignRight title={dropdownTitle}>
            <NavDropdown.Item href={htmlUrl} target="_blank" rel="noopener noreferrer">
              My GitHub
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => onClickLogout()}>Log Out</NavDropdown.Item>
          </NavDropdown>
        )
        : <Nav.Link onClick={() => history.push('/login')}>Log In</Nav.Link>
    );
  }

  render() {
    const { history } = this.props;

    return (
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand onClick={() => history.push('/')}>Appraise.js</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            {this.renderNavLinks()}
          </Nav>
          <Nav>
            {this.renderDropdown()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

AppNavbar.propTypes = {
  ...routePropTypes,
  fetchUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onClickLogout: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  user: PropTypes.exact({
    data: PropTypes.exact(userPropTypes),
    error: PropTypes.string,
    status: statusPropType,
  }).isRequired,
};

export default withRouter(AppNavbar);
