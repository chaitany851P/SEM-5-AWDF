import React from 'react';

function Footer({ email, year = 2026 }) {
  return (
    <footer className="footer" id="contact">
      <p>&copy; {year} Student Portfolio. Built for AWDF (ITUE301).</p>
      {email && <p>Contact: {email}</p>}
    </footer>
  );
}

export default Footer;
