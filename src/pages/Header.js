import React, { useState } from 'react';
import '../components/Header/Header.css';
import { NavLink } from 'react-router-dom';
import img_logo from '../image/logo.png';

const Header = () => {
  return (
    <header>
      <NavLink to="/" className="nav-link">
        <img src={img_logo} className="logo" alt="Wildlens Logo" />
      </NavLink>
    </header>
  );
};

export default Header;