import React from 'react';
import PropTypes from 'prop-types';

// Components
import AuthorListRow from './AuthorListRow';

const AuthorList = ({
  authors, sort, sortOrder, sortBy,
}) => {
  const sortArrowDisplay = (field) => {
    if (sortBy === field) {
      return sortOrder === 'desc'
        ? <i className="glyphicon glyphicon-arrow-up" />
        : <i className="glyphicon glyphicon-arrow-down" />;
    }

    return '';
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th onClick={() => sort('firstName')}>
            First Name
            {sortArrowDisplay('firstName')}
          </th>
          <th onClick={() => sort('lastName')}>
            Last Name
            {sortArrowDisplay('lastName')}
          </th>
        </tr>
      </thead>
      <tbody>
        {authors.map(author => <AuthorListRow key={author.id} author={author} />)}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  sort: PropTypes.func,
  sortOrder: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
};

AuthorList.defaultProps = {
  sort: (() => {}),
};

export default AuthorList;
