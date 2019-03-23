import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => (
  <div className="spinner">
    <ClipLoader color="steelblue" size={80} />
  </div>
);

export default Spinner;
