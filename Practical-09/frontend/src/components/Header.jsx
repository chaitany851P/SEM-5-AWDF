import React from 'react';

function Header({ name, title, themeColor = '#2563eb' }) {
  return (
    <header className="header" style={{ backgroundColor: themeColor }}>
      <h1>{name}'s Portfolio</h1>
      <p>{title}</p>
    </header>
  );
}

export default Header;
