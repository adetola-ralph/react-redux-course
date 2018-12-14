import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import { AuthorApi } from '../../../api/mockAuthorApi';
import ManageAuthorComponent, { ManageAuthor } from '../ManageAuthor';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

AuthorApi.saveAuthor = jest.fn((author) =>  Promise.resolve(author));

let saveAuthor = jest.fn((arg) => Promise.resolve(arg));
const push = jest.fn();
let wrapper;
let store;

const props = {
  author: {
    firstName: 'John',
    lastName: 'Doe',
    id: '1',
  },
  saveAuthor,
  history: {
    push,
  },
};

describe('Manage Author component', () => {
  beforeEach(() => {
    wrapper = shallow(<ManageAuthor {...props} />);
  });

  it('renders without error', () => {
    const state = wrapper.state();
    expect(state.author).toEqual(props.author);
  });

  it('should update the author in its state', () => {
    const event = {
      target: {
        name: 'firstName',
        value: 'Jane',
      },
    };

    wrapper.find('AuthorForm').simulate('change', event);
    const state = wrapper.state();
    expect(state.author.firstName).toEqual('Jane');
    expect(state.isModified).toEqual(true);
  });

  it('should attempt to store the new author in its state', (done) => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'firstName',
        value: 'Jane',
      },
    };

    wrapper.find('AuthorForm').simulate('change', event);
    wrapper.find('AuthorForm').simulate('save', event);
    let state = wrapper.state();
    expect(state.saving).toEqual(true);

    setImmediate(() => {
      state = wrapper.state();
      expect(saveAuthor).toHaveBeenCalled();
      expect(state.isModified).toEqual(false);
      expect(state.saving).toEqual(false);
      expect(props.history.push).toHaveBeenCalled();
      done();
    });
  });

  it.skip('should set saving to false if there is an error', (done) => {
    saveAuthor = jest.fn(() => Promise.reject());
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'firstName',
        value: 'Jane',
      },
    };

    wrapper.find('AuthorForm').simulate('change', event);
    wrapper.find('AuthorForm').simulate('save', event);

    setImmediate(() => {
      const state = wrapper.state();
      expect(state.saving).toEqual(false);
      done();
    });
  });
});

describe('ManageAuthorComponent redux connection', () => {
  beforeEach(() => {
    const initialState = {
        authors: [
          {
            firstName: 'John',
            lastName: 'Doe',
            id: '1',
          },
        ],
    };
    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <ManageAuthorComponent store={store} authorId={'1'} />
    );
  });

  afterEach(() => {
    store.clearActions();
  });

  test('map dispatch to props', (done) => {
    wrapper.props().saveAuthor({ id: '1' });

    setImmediate(() => {
      const actions = store.getActions();
      expect(actions).toEqual([
        { type: 'BEGIN_AJAX_CALL' },
        {
          author: { id: '1' },
          type: 'UPDATE_AUTHOR_SUCCESS'
        }
      ]);
      done();
    });
  });

  test('map state to props', () => {
    expect(wrapper.props().author).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      id: '1',
    });
  });

  test('map state to props for non existent authorid', () => {
    wrapper = shallow(
      <ManageAuthorComponent store={store} />
    );

    expect(wrapper.props().author).toEqual({
      firstName: '',
      lastName: '',
      id: '',
    });
  });
});
