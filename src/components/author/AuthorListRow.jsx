import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthorListRow = ({ author }) => (
  <tr>
    <td><a href="/" target="_blank" rel="noreferrer noopener">View Profile</a></td>
    <td>
      <Link to={`/author/${author.id}`}>
        {author.firstName}
      </Link>
    </td>
    <td>
      <Link to={`/author/${author.id}`}>
        {author.lastName}
      </Link>
    </td>
  </tr>
);

AuthorListRow.propTypes = {
  author: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default AuthorListRow;
