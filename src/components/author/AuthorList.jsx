import React from 'react';
import PropTypes from 'prop-types';

// Components
import AuthorListRow from './AuthorListRow';

const AuthorList = ({ authors }) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {authors.map(author => <AuthorListRow key={author.id} author={author} />)}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AuthorList;
