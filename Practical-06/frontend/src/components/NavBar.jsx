import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        end
      >
        Home
      </NavLink>
      <NavLink
        to="/tasks"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Tasks (Full-Stack)
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Contact
      </NavLink>
    </nav>
  );
}

export default NavBar;
