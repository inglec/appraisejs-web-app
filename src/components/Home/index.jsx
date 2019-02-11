import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <p>Welcome to the home page!</p>
    <Link to="/login">Log in</Link>
  </div>
);

export default Home;
