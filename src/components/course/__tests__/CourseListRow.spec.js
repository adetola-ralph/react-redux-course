import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import CourseListRow from '../CourseListRow';

const deleteCourse = jest.fn((arg) => arg);
let wrapper;
let tr;

const props = {
  course: {
    title: 'Title',
    watchHref: 'http://web.site',
    authorId: '2',
    length: '5:08',
    category: 'programming',
    id: '1',
  },
  deleteCourse,
};

describe('Course List Row component', () => {
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <CourseListRow {...props} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    tr = wrapper.find('tr');
  });

  it('should render a table row', () => {
    expect(tr.children().length).toEqual(6);

    const linkColumn = tr.childAt(0);
    const titleColumn = tr.childAt(1);
    const authorIdColumn = tr.childAt(2);

    expect(linkColumn.find('a').prop('href')).toEqual('http://web.site');
    expect(titleColumn.find('a').text()).toEqual('Title');
    expect(authorIdColumn.text()).toEqual('2');
  });

  it('should call delete function on button click', () => {
    const deleteButton = tr.find('button');
    deleteButton.simulate('click');
    expect(deleteCourse).toHaveBeenCalled();
    expect(deleteCourse.mock.results[0].value).toEqual({
      title: 'Title',
      watchHref: 'http://web.site',
      authorId: '2',
      length: '5:08',
      category: 'programming',
      id: '1',
    })
  });
});
