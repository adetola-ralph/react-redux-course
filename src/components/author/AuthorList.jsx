import React from 'react';
import PropTypes from 'prop-types';

// Components
import AuthorListRow from './AuthorListRow';
import SortArrow from '../common/SortArrowComponent';

const AuthorList = ({
  authors, sort, sortOrder, sortBy,
}) => (
  <table className="table table-hover table-bordered">
    <thead className="thead-dark">
      <tr>
        <th>&nbsp;</th>
        <th onClick={() => sort('firstName')}>
            First Name
          {<SortArrow display={sortBy === 'firstName'} order={sortOrder} />}
        </th>
        <th onClick={() => sort('lastName')}>
            Last Name
          {<SortArrow display={sortBy === 'lastName'} order={sortOrder} />}
        </th>
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
  sort: PropTypes.func,
  sortOrder: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
};

AuthorList.defaultProps = {
  sort: (() => {}),
};

export default AuthorList;
