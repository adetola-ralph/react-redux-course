import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { CourseApi } from '../../../api/mockCourseApi';
import CoursesPageComponent, { CoursesPage } from '../CoursesPage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

CourseApi.deleteCourse = jest.fn(() => Promise.resolve());


const sortCourse = jest.fn(() => {});
const deleteCourse = jest.fn(() => {});
const push = jest.fn();
let wrapper;
let store;

const props = {
  courses: [
    {
      title: 'Title',
      watchHref: 'http://web.site',
      authorId: '2',
      length: '5:08',
      category: 'programming',
      id: '1',
    },
    {
      title: 'Title2',
      watchHref: 'http://web.info',
      authorId: '2',
      length: '10:10',
      category: 'programming science',
      id: '2',
    },
  ],
  sortCourse,
  deleteCourse,
  sortOrder: 'asc',
  sortBy: '',
  history: {
    push,
  },
};

describe('Author Page component', () => {
  beforeEach(() => {
    wrapper = shallow(<CoursesPage {...props} />);
  });

  it('renders CourseList', () => {
    const courseList = wrapper.find('CourseList');
    expect(courseList.length).toEqual(1);
    const emptyList = wrapper.find('EmptyList');
    expect(emptyList.length).toEqual(0);
  });

  it('should render EmptyList component if no authors', () => {
    const newProps = { ...props, courses: [] };
    const element = shallow(<CoursesPage {...newProps} />);
    const courseList = element.find('CourseList');
    expect(courseList.length).toEqual(0);
    const emptyList = element.find('EmptyList');
    expect(emptyList.length).toEqual(1);
  });
});

describe('CoursesPageComponent redux connection', () => {
  beforeEach(() => {
    const initialState = {
      sort: {
        course: {
          sortBy: 'title',
          sortOrder: 'desc',
        },
      },
      courses: [
        {
          title: 'Title',
          watchHref: 'http://web.site',
          authorId: '2',
          length: '5:08',
          category: 'programming',
          id: '1',
        },
        {
          title: 'Title2',
          watchHref: 'http://web.info',
          authorId: '2',
          length: '10:10',
          category: 'programming science',
          id: '2',
        },
      ],
    };
    store = mockStore(initialState);
    wrapper = shallow(<CoursesPageComponent store={store} />);
  });

  afterEach(() => {
    store.clearActions();
  });

  test('map dispatch to props sortCourse', () => {
    wrapper.props().sortCourse('asc', 'title');

    const actions = store.getActions();
    expect(actions).toEqual([{
      list: 'course', sortBy: 'asc', sortOrder: 'title', type: 'SORT',
    }]);
  });

  test('map dispatch to props deleteCourse', (done) => {
    wrapper.props().deleteCourse({ id: '2' });

    setImmediate(() => {
      const actions = store.getActions();
      expect(actions).toEqual([{ type: 'BEGIN_AJAX_CALL' }, { course: { id: '2' }, type: 'DELETE_COURSE_SUCCESS' }]);
      done();
    });
  });

  test('map state to props sort in asc order', () => {
    expect(wrapper.props().courses).toEqual([
      {
        title: 'Title2',
        watchHref: 'http://web.info',
        authorId: '2',
        length: '10:10',
        category: 'programming science',
        id: '2',
      },
      {
        title: 'Title',
        watchHref: 'http://web.site',
        authorId: '2',
        length: '5:08',
        category: 'programming',
        id: '1',
      },
    ]);
  });

  test('map state to props sort in desc order', () => {
    const newStore = mockStore({
      courses: [
        {
          title: 'Title',
          watchHref: 'http://web.site',
          authorId: '2',
          length: '5:08',
          category: 'programming',
          id: '1',
        },
        {
          title: 'Title2',
          watchHref: 'http://web.info',
          authorId: '2',
          length: '10:10',
          category: 'programming science',
          id: '2',
        },
      ],
      sort: {
        course: {
          sortBy: 'title',
          sortOrder: 'asc',
        },
      },

    });

    const element = shallow(<CoursesPageComponent store={newStore} />);
    expect(element.props().courses).toEqual([
      {
        title: 'Title',
        watchHref: 'http://web.site',
        authorId: '2',
        length: '5:08',
        category: 'programming',
        id: '1',
      },
      {
        title: 'Title2',
        watchHref: 'http://web.info',
        authorId: '2',
        length: '10:10',
        category: 'programming science',
        id: '2',
      },
    ]);
  });
});
