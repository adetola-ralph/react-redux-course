import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

// Components
import AuthorList from './AuthorList';
import EmptyList from '../common/EmptyList';

const AuthorsPage = ({ authors, history }) => {
  const redirectToAutorAddPage = () => {
    history.push('/author');
  };

  return (
    <div>
      <h1>Authors</h1>
      <button className="btn btn-primary" type="button" onClick={redirectToAutorAddPage}>Add Author</button>
      {
        authors.length > 0
          ? <AuthorList authors={authors} />
          : <EmptyList message="Nothing to see here, Add a new author" buttonAction={redirectToAutorAddPage} buttonMessage="Add a new Author" />
      }
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
};

const mapStateToProps = state => ({
  authors: state.authors,
});

export default connect(mapStateToProps)(AuthorsPage);
