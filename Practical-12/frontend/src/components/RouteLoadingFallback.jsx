import React from 'react';

function RouteLoadingFallback({ routeName = 'Requested view' }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        background: 'var(--card-bg)',
        border: '1px dashed var(--primary-color)',
        borderRadius: '8px',
        margin: '1.5rem 0',
        animation: 'pulse 1.5s infinite ease-in-out'
      }}
    >
      <div className="spinner" style={{ marginBottom: '1rem' }}></div>
      <h3 style={{ color: 'var(--primary-color)', fontSize: '1.15rem' }}>
        Lazy Loading Chunk...
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
        Downloading JavaScript chunk for {routeName} on demand (React.lazy + Suspense)
      </p>
    </div>
  );
}

export default RouteLoadingFallback;
