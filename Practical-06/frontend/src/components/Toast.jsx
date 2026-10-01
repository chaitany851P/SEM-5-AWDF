import React from 'react';

function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: isError ? '#ef4444' : '#10b981',
        color: '#ffffff',
        padding: '0.85rem 1.4rem',
        borderRadius: '8px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 9999,
        fontWeight: 500
      }}
    >
      <span>{isError ? '❌' : '✅'}</span>
      <span>{toast.message}</span>
      <button
        type="button"
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1rem',
          marginLeft: '0.5rem'
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;
