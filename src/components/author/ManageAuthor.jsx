import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Prompt } from 'react-router';
import { validate } from 'validate.js';
import React, { Component, Fragment } from 'react';

// Actions
import { saveAuthor as saveAuthorAction } from '../../actions/authorActions';

// Components
import AuthorForm from './AuthorForm';

const authorValidationConstraint = {
  firstName: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 3,
    },
  },
  lastName: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 3,
    },
  },
};

class ManageAuthor extends Component {
  constructor(props) {
    super(props);
    const { author } = props;

    this.state = {
      author: { ...author },
      errors: {},
      saving: false,
      isModified: false,
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthorMethod = this.saveAuthorMethod.bind(this);
  }

  updateAuthorState(event) {
    const { name, value } = event.target;
    let { author, errors } = this.state;
    author = { ...author, [name]: value };
    errors = { ...errors, [name]: [] };
    return this.setState({ author, isModified: true, errors });
  }

  saveAuthorMethod(event) {
    event.preventDefault();
    const { saveAuthor, history } = this.props;
    const { author } = this.state;
    const validators = validate(author, authorValidationConstraint);

    if (validators) {
      return this.setState({
        errors: { ...validators },
      });
    }

    this.setState({ saving: true });
    return saveAuthor(author).then(() => {
      this.setState({ saving: false, isModified: false });
      toastr.success('Author saved');
      history.push('/authors');
    }).catch((error) => {
      this.setState({ saving: false });
      toastr.error(error);
    });
  }

  render() {
    const {
      saving, errors, author, isModified,
    } = this.state;
    const { updateAuthorState, saveAuthorMethod } = this;

    return (
      <Fragment>
        <Prompt
          when={isModified}
          message={() => 'You have unsaved changes, are you sure you want to leave?'}
        />
        <AuthorForm
          onChange={updateAuthorState}
          onSave={saveAuthorMethod}
          author={author}
          errors={errors}
          saving={saving}
        />
      </Fragment>
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
  const { authorId } = ownProps;
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
