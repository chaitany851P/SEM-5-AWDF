import React, { useState } from 'react';

function Contact() {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="section-card">
      <h2>Contact Me</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        This page demonstrates controlled form input handling and reactive state updates using React's <code>useState</code> hook.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="senderName">Your Name:</label>
          <input
            id="senderName"
            type="text"
            className="form-input"
            placeholder="e.g. John Doe"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message (Controlled Input):</label>
          <textarea
            id="message"
            className="form-input"
            rows="4"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setSubmitted(false);
            }}
          />
          <div className="char-counter">
            Character count: <strong>{message.length}</strong> characters
          </div>
        </div>

        <button type="submit" className="toggle-banner-btn" style={{ width: '100%' }}>
          Send Message
        </button>
      </form>

      {/* Real-time State Display */}
      <div className="live-preview">
        <h4>Live Reactive State Preview:</h4>
        <p><strong>Sender:</strong> {senderName || '(typing...)'}</p>
        <p><strong>Message:</strong> {message || '(empty)'}</p>
        {submitted && (
          <p style={{ color: '#16a34a', marginTop: '0.5rem', fontWeight: 600 }}>
            ✅ Message captured successfully in component state!
          </p>
        )}
      </div>
    </div>
  );
}

export default Contact;
