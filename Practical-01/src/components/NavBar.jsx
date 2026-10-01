import React from 'react';

function NavBar({ activeSection, onSelectSection }) {
  const sections = ['About', 'Skills', 'Contact'];

  return (
    <nav className="navbar">
      {sections.map((section) => (
        <button
          key={section}
          type="button"
          className={activeSection === section ? 'active' : ''}
          onClick={() => onSelectSection && onSelectSection(section)}
        >
          {section}
        </button>
      ))}
    </nav>
  );
}

export default NavBar;
