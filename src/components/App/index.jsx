import { pick } from 'lodash/object';
import PrivateRoute from 'react-private-route';
import PropTypes from 'prop-types';
import React from 'react';
import HomeIcon from 'react-feather/dist/icons/home';
import InstallationsIcon from 'react-feather/dist/icons/grid';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from 'appraisejs-containers/Navbar';
import NotFound from 'appraisejs-components/NotFound';
import Callback from 'appraisejs-containers/Callback';
import Home from 'appraisejs-containers/Home';
import Installations from 'appraisejs-containers/Installations';
import Login from 'appraisejs-containers/Login';

import './styles';

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home,
    navbar: true,
    icon: HomeIcon,
  },
  {
    name: 'Callback',
    path: '/callback',
    component: Callback,
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Installations',
    path: '/installations',
    component: Installations,
    isPrivate: true,
    navbar: true,
    icon: InstallationsIcon,
  },
  {
    name: 'Not Found',
    component: NotFound,
  },
];

const App = ({ isAuthenticated }) => {
  const navbarRoutes = routes.filter(({ isPrivate, navbar }) => (
    navbar && (!isPrivate || (isPrivate && isAuthenticated))
  ));

  const routeComponents = routes.map((route) => {
    const { isPrivate, name } = route;
    const props = {
      ...pick(route, 'component', 'exact', 'path'),
      key: name,
    };

    return isPrivate
      ? <PrivateRoute isAuthenticated={isAuthenticated} redirect="/" {...props} />
      : <Route {...props} />;
  });

  return (
    <BrowserRouter>
      <div id="app">
        <Switch>
          <Navbar routes={navbarRoutes} />
        </Switch>
        <Switch>
          {routeComponents}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default App;
