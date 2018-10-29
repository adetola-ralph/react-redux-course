import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

// Actions
import { saveAuthor as saveAuthorAction } from '../../actions/authorActions';

// Components
import AuthorForm from './AuthorForm';

class ManageAuthor extends Component {
  constructor(props) {
    super(props);
    const { author } = props;

    this.state = {
      author: { ...author },
      errors: {},
      saving: false,
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthorMethod = this.saveAuthorMethod.bind(this);
  }

  updateAuthorState(event) {
    const { name, value } = event.target;
    let { author } = this.state;
    author = { ...author, [name]: value };
    return this.setState({ author });
  }

  saveAuthorMethod(event) {
    event.preventDefault();
    this.setState({ saving: true });
    const { saveAuthor, history } = this.props;
    const { author } = this.state;

    saveAuthor(author).then(() => {
      this.setState({ saving: false });
      toastr.success('Author saved');
      history.push('/authors');
    }).catch((error) => {
      this.setState({ saving: false });
      toastr.error(error);
    });
  }

  render() {
    const { saving, errors, author } = this.state;
    const { updateAuthorState, saveAuthorMethod } = this;

    return (
      <AuthorForm
        onChange={updateAuthorState}
        onSave={saveAuthorMethod}
        author={author}
        errors={errors}
        saving={saving}
      />
    );
  }
}
ManageAuthor.propTypes = {
  author: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

ManageAuthor.defaultProps = {
  author: {},
};

const mapStateToProps = (state, ownProps) => {
  const authorId = ownProps.match.params.id;
  let author = {
    id: '', firstName: '', lastName: '',
  };

  if (authorId) {
    author = state.authors.find(_author => _author.id === authorId);
  }

  return { author };
};

const mapDispatchToProps = dispatch => ({
  saveAuthor: author => dispatch(saveAuthorAction(author)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthor);
