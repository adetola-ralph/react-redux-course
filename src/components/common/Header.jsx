import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingDots from './LoadingDots';

const Header = ({ loading, numberOfCourses }) => (
  <nav>
    <Link to="/">Home</Link>
    { '|' }
    <Link to="/about">About</Link>
    { '|' }
    <Link to="/courses">Courses</Link>
    { '|' }
    <Link to="/authors">Authors</Link>
    { '|' }
    <span>
      Number of courses:&nbsp;
      {numberOfCourses}
    </span>
    <span>{loading && <LoadingDots interval={100} dots={20} />}</span>
  </nav>
);

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  numberOfCourses: PropTypes.number,
};

Header.defaultProps = {
  numberOfCourses: 0,
};

export default Header;
