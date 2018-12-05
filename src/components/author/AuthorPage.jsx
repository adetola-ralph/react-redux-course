import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

// Components
import AuthorList from './AuthorList';
import EmptyList from '../common/EmptyList';

// Actions
import sortList from '../../actions/sortActions';

const AuthorsPage = ({
  authors, history, sortAuthor, sortOrder, sortBy,
}) => {
  const redirectToAutorAddPage = () => {
    history.push('/author');
  };

  const sort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    sortAuthor(field, newSortOrder);
  };


  return (
    <div>
      <h1>Authors</h1>
      <button className="btn btn-primary" type="button" onClick={redirectToAutorAddPage}>Add Author</button>
      <div className="list-body">
        {
          authors.length > 0
            ? (
              <AuthorList
                authors={authors}
                sort={sort}
                sortOrder={sortOrder}
                sortBy={sortBy}
              />
            )
            : (
              <EmptyList
                message="Nothing to see here, Add a new author"
                buttonAction={redirectToAutorAddPage}
                buttonMessage="Add a new Author"
              />
            )
        }
      </div>
    </div>
  );
};

AuthorsPage.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  sortAuthor: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  // Had to do this because the system complained i was mutating redux state
  // So I am creating a copy here rather that using destructuring
  const authors = [...state.authors];
  const { sort } = state;
  return {
    authors: authors.sort((a, b) => {
      // TODO: have to find a better way of dealing with this (code duplication, fragile code)
      const { sortBy, sortOrder } = sort.author;
      if (sortOrder === 'desc') {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      if (sortOrder === 'asc') {
        return a[sortBy].localeCompare(b[sortBy]);
      }

      return 0;
    }),
    sortOrder: sort.author.sortOrder,
    sortBy: sort.author.sortBy,
  };
};

const mapDispatchToProps = dispatch => ({
  sortAuthor: (sortBy, sortOrder) => dispatch(sortList(sortBy, sortOrder, 'author')),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
