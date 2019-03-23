import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { routePropTypes } from 'appraisejs-proptypes/react_router';

import './styles';

const Home = ({ history, isAuthenticated }) => {
  let buttonMessage = 'Log In via GitHub';
  let buttonHref = '/login';
  if (isAuthenticated) {
    buttonMessage = 'My Installations';
    buttonHref = '/installations';
  }

  return (
    <div className="page home">
      <div className="page-container">
        <Jumbotron>
          <h1>
            {'Welcome to '}
            <b>Appraise.js</b>
          </h1>
          <p>Track your Node.js projects and benchmark function execution between commits</p>
          <Button onClick={() => history.push(buttonHref)}>{buttonMessage}</Button>
        </Jumbotron>
      </div>
    </div>
  );
};

Home.propTypes = {
  ...routePropTypes,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Home;
