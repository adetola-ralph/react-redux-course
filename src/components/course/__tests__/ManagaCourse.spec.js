import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { CourseApi } from '../../../api/mockCourseApi';
import ManageCourseComponent, { ManageCoursePage } from '../ManageCoursePage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

CourseApi.saveCourse = jest.fn(course => Promise.resolve(course));

const saveCourse = jest.fn(arg => Promise.resolve(arg));
const push = jest.fn();
let wrapper;
let store;

const props = {
  course: {
    title: 'Title2',
    watchHref: 'http://web.info',
    authorId: '2',
    length: '10:10',
    category: 'programming science',
    id: '2',
  },
  allAuthors: [{ id: '1' }],
  actions: {
    saveCourse,
  },
  history: {
    push,
  },
};

describe('Manage Course component', () => {
  beforeEach(() => {
    wrapper = shallow(<ManageCoursePage {...props} />);
  });

  it('renders without error', () => {
    const state = wrapper.state();
    expect(state.course).toEqual(props.course);
  });

  it('should update the author in its state', () => {
    const event = {
      target: {
        name: 'title',
        value: 'Another title',
      },
    };

    wrapper.find('CourseForm').simulate('change', event);
    const state = wrapper.state();
    expect(state.course.title).toEqual('Another title');
    expect(state.isModified).toEqual(true);
  });

  it('should attempt to store the new course in its state', (done) => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'title',
        value: 'Another title',
      },
    };

    wrapper.find('CourseForm').simulate('change', event);
    wrapper.find('CourseForm').simulate('save', event);
    let state = wrapper.state();
    expect(state.saving).toEqual(true);

    setImmediate(() => {
      state = wrapper.state();
      expect(saveCourse).toHaveBeenCalled();
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

  it.skip('getDerivedStateFromProps', () => {

  });
});

describe('ManageCourseComponent redux connection', () => {
  beforeEach(() => {
    const initialState = {
      courses: [
        {
          title: 'Title2',
          watchHref: 'http://web.info',
          authorId: '2',
          length: '10:10',
          category: 'programming science',
          id: '2',
        },
      ],
      authors: [
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
        },
      ],
    };
    store = mockStore(initialState);
    // Shallow render the container passing in the mock store
    wrapper = shallow(
      <ManageCourseComponent store={store} courseId="2" />,
    );
  });

  afterEach(() => {
    store.clearActions();
  });

  test.skip('map dispatch to props', (done) => {
    wrapper.props().saveAuthor({ id: '1' });

    setImmediate(() => {
      const actions = store.getActions();
      expect(actions).toEqual([
        { type: 'BEGIN_AJAX_CALL' },
        {
          author: { id: '1' },
          type: 'UPDATE_AUTHOR_SUCCESS',
        },
      ]);
      done();
    });
  });

  test('map state to props', () => {
    expect(wrapper.props().course).toEqual({
      title: 'Title2',
      watchHref: 'http://web.info',
      authorId: '2',
      length: '10:10',
      category: 'programming science',
      id: '2',
    });

    expect(wrapper.props().allAuthors).toEqual([{
      value: '2',
      text: 'Jane Doe',
    }]);
  });

  test('map state to props for non existent authorid', () => {
    wrapper = shallow(
      <ManageCourseComponent store={store} />,
    );

    expect(wrapper.props().course).toEqual({
      title: '',
      watchHref: '',
      authorId: '',
      length: '',
      category: '',
      id: '',
    });

    expect(wrapper.props().allAuthors).toEqual([{
      value: '2',
      text: 'Jane Doe',
    }]);
  });
});
