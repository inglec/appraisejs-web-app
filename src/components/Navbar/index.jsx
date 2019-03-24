import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import GitHubIcon from 'react-feather/dist/icons/github';
import LoginIcon from 'react-feather/dist/icons/log-in';
import LogoutIcon from 'react-feather/dist/icons/log-out';
import { withRouter } from 'react-router-dom';

import IconedText from 'appraisejs-components/IconedText';
import { routePropTypes } from 'appraisejs-proptypes/react_router';
import { statusPropType, userPropTypes } from 'appraisejs-proptypes/redux';
import { UNFETCHED } from 'appraisejs-utils/redux';

import './styles';

class AppNavbar extends PureComponent {
  componentDidMount() {
    this.verifyUser();
  }

  componentDidUpdate() {
    this.verifyUser();
  }

  verifyUser() {
    const { fetchUser, isAuthenticated, user } = this.props;

    if (isAuthenticated && user.status === UNFETCHED) {
      fetchUser();
    }
  }

  renderNavLinks() {
    const { history, location, routes } = this.props;

    return routes.map((route) => {
      const {
        icon: Icon,
        exact,
        name,
        path,
      } = route;

      const regex = new RegExp(`^${path}${exact ? '$' : ''}`);
      const active = !!regex.exec(location.pathname);

      return (
        <Nav.Link key={name} active={active} onClick={() => history.push(path)}>
          {Icon ? <IconedText icon={Icon}>{name}</IconedText> : name}
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

    const displayName = name || login || 'Me';
    const dropdownTitle = avatarUrl
      ? (
        <span>
          <img src={avatarUrl} alt="avatar" className="icon" />
          {displayName}
        </span>
      )
      : displayName;

    return (
      isAuthenticated
        ? (
          <NavDropdown alignRight title={dropdownTitle}>
            <NavDropdown.Item href={htmlUrl} target="_blank" rel="noopener noreferrer">
              <IconedText icon={GitHubIcon}>My GitHub</IconedText>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="logout" onClick={() => onClickLogout()}>
              <IconedText icon={LogoutIcon}>Log Out</IconedText>
            </NavDropdown.Item>
          </NavDropdown>
        )
        : (
          <Nav.Link onClick={() => history.push('/login')}>
            <LoginIcon className="icon" />
            Log In
          </Nav.Link>
        )
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

      exact: PropTypes.bool,
      icon: PropTypes.func,
    }),
  ).isRequired,
  user: PropTypes.exact({
    data: PropTypes.exact(userPropTypes),
    error: PropTypes.string,
    status: statusPropType.isRequired,
  }).isRequired,
};

export default withRouter(AppNavbar);
