import React from 'react';

function Footer({ email, year = 2026 }) {
  return (
    <footer className="footer">
      <p>&copy; {year} Student Portfolio. Built for AWDF (ITUE301) - Practical 2.</p>
      {email && <p>Contact: {email}</p>}
    </footer>
  );
}

export default Footer;
