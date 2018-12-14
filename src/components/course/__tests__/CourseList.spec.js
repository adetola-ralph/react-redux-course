import { shallow } from 'enzyme';
import CourseList from '../CourseList';


const sortFn = jest.fn(arg => arg);
const deleteCourse = jest.fn(arg => arg);
let table;
let thead;
let tbody;
let wrapper;

const props = {
  sort: sortFn,
  sortBy: '',
  sortOrder: 'desc',
  deleteCourse,
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

describe('Author Lost component', () => {
  beforeEach(() => {
    wrapper = shallow(<CourseList {...props} />);
    table = wrapper.find('table');
    tbody = table.find('tbody');
    thead = table.find('thead');
  });

  it('should render a table', () => {
    expect(table.length).toEqual(1);
    expect(tbody.children().length).toEqual(2);
  });

  it('trigger sort function when header is clicked on', () => {
    const tr = thead.find('tr');
    const titleColumn = tr.childAt(1);
    const authorIdColumn = tr.childAt(2);
    const categoryColumn = tr.childAt(3);
    const lengthColumn = tr.childAt(4);


    titleColumn.simulate('click', {});
    expect(sortFn).toHaveBeenCalled();
    expect(sortFn.mock.results[0].value).toEqual('title');

    authorIdColumn.simulate('click', {});
    expect(sortFn).toHaveBeenCalled();
    expect(sortFn.mock.results[1].value).toEqual('authorId');

    categoryColumn.simulate('click', {});
    expect(sortFn).toHaveBeenCalled();
    expect(sortFn.mock.results[2].value).toEqual('category');

    lengthColumn.simulate('click', {});
    expect(sortFn).toHaveBeenCalled();
    expect(sortFn.mock.results[3].value).toEqual('length');
  });
});
