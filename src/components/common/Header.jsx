import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingDots from './LoadingDots';

const Header = ({ loading }) => (
  <nav>
    <Link to="/">Home</Link>
    { '|' }
    <Link to="/about">About</Link>
    { '|' }
    <Link to="/courses">Courses</Link>
    { '|' }
    <Link to="/authors">Authors</Link>
    {loading && <LoadingDots interval={100} dots={20} />}
  </nav>
);

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Header;
