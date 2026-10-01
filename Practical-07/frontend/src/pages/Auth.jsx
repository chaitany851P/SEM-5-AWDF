import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/api';

function Auth({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg('');

    try {
      if (isRegister) {
        await registerUser(name, email, password);
        setSuccessMsg('Registration successful! You can now log in.');
        setIsRegister(false);
      } else {
        const result = await loginUser(email, password);
        if (onAuthSuccess) {
          onAuthSuccess(result.user);
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-card" style={{ maxWidth: '480px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={() => {
            setIsRegister(false);
            setError(null);
          }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: !isRegister ? 'var(--primary-color)' : 'transparent',
            color: !isRegister ? '#fff' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '6px 0 0 0',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRegister(true);
            setError(null);
          }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: isRegister ? 'var(--primary-color)' : 'transparent',
            color: isRegister ? '#fff' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '0 6px 0 0',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Create Account
        </button>
      </div>

      <h2>{isRegister ? 'Register Account' : 'Sign In to Task Manager'}</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
        {isRegister
          ? 'Create a new account with bcrypt password hashing.'
          : 'Authenticate with email and password to receive a signed JWT token.'}
      </p>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {successMsg && (
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="form-group">
            <label htmlFor="authName">Full Name *</label>
            <input
              id="authName"
              type="text"
              className="form-input"
              placeholder="e.g. Chaitanya Patel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="authEmail">Email Address *</label>
          <input
            id="authEmail"
            type="email"
            className="form-input"
            placeholder="e.g. student@charusat.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="authPass">Password (min 6 characters) *</label>
          <input
            id="authPass"
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="toggle-banner-btn"
          style={{ width: '100%', marginTop: '0.5rem' }}
          disabled={loading}
        >
          {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Auth;
