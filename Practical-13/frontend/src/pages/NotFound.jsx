import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="section-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '0.5rem' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', margin: '1rem 0 1.5rem' }}>
        The route you are looking for does not exist in this Single Page Application.
      </p>
      <Link to="/" className="toggle-banner-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
