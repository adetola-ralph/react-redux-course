import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import AuthorPageComponent, { AuthorsPage } from '../AuthorPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const sortAuthor = jest.fn(() => {});
const push = jest.fn();
let wrapper;
let store;

const props = {
  authors: [
    {
      firstName: 'John',
      lastName: 'Doe',
      id: '1',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      id: '2',
    },
  ],
  sortAuthor,
  sortOrder: 'asc',
  sortBy: '',
  history: {
    push,
  },
};

describe('Author Page component', () => {
  beforeEach(() => {
    wrapper = shallow(<AuthorsPage {...props} />);
  });

  it('renders AuthorList', () => {
    const authorList = wrapper.find('AuthorList');
    expect(authorList.length).toEqual(1);
    const emptyList = wrapper.find('EmptyList');
    expect(emptyList.length).toEqual(0);
  });

  it('should render EmptyList component if no authors', () => {
    const newProps = { ...props, authors: [] };
    const element = shallow(<AuthorsPage {...newProps} />);
    const authorList = element.find('AuthorList');
    expect(authorList.length).toEqual(0);
    const emptyList = element.find('EmptyList');
    expect(emptyList.length).toEqual(1);
  });
});

describe('AuthorPageComponent redux connection', () => {
  beforeEach(() => {
    const initialState = {
      sort: {
        author: {
          sortBy: 'firstName',
          sortOrder: 'desc',
        },
      },
      authors: [
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
        },
        {
          id: '1',
          firstName: 'Peter',
          lastName: 'Alexandria',
        },
      ],
    };
    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    wrapper = shallow(<AuthorPageComponent store={store} />);
  });

  afterEach(() => {
    store.clearActions();
  });

  test('map dispatch to props', () => {
    wrapper.props().sortAuthor('asc', 'firstName');

    const actions = store.getActions();
    expect(actions).toEqual([{
      list: 'author', sortBy: 'asc', sortOrder: 'firstName', type: 'SORT',
    }]);
  });

  test('map state to props sort in asc order', () => {
    expect(wrapper.props().authors).toEqual([
      {
        id: '1',
        firstName: 'Peter',
        lastName: 'Alexandria',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Doe',
      },
    ]);
  });

  test('map state to props sort in desc order', () => {
    const newStore = mockStore({
      authors: [
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
        },
        {
          id: '1',
          firstName: 'Peter',
          lastName: 'Alexandria',
        },
      ],
      sort: {
        author: {
          sortBy: 'firstName',
          sortOrder: 'asc',
        },
      },

    });

    const element = shallow(<AuthorPageComponent store={newStore} />);
    expect(element.props().authors).toEqual([
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Doe',
      },
      {
        id: '1',
        firstName: 'Peter',
        lastName: 'Alexandria',
      },
    ]);
  });
});
