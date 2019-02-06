import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      <p>Welcome to the home page!</p>
      <Link to='/login'>Log in</Link>
    </div>
  )
};

export default Home;
