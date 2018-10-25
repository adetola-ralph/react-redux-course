import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <Link to="/">Home</Link>
    { '|' }
    <Link to="/about">About</Link>
    { '|' }
    <Link to="/courses">Courses</Link>
  </nav>
);

export default Header;
