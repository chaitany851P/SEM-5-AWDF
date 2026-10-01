import React from 'react';

function Spinner({ message = 'Fetching repositories from GitHub API...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Spinner;
