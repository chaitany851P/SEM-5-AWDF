import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card">
      <div className="error-icon">⚠️</div>
      <h3>API Request Failed</h3>
      <p>{message || 'Unable to retrieve data from the external server.'}</p>
      {onRetry && (
        <button type="button" className="retry-btn" onClick={onRetry}>
          🔄 Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
