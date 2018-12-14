import { shallow, mount } from 'enzyme';

import AuthorList from '../AuthorList';

const sortFn = jest.fn((arg) => arg);
let table;
let thead;
let tbody;
let wrapper;

const props = {
  sort: sortFn,
  sortBy: '',
  sortOrder: 'desc',
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
    }
  ]
};

describe('Author Lost component', () => {
  beforeEach(() => {
    wrapper = shallow(<AuthorList {...props} />);
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
    const firstNameHeader = tr.childAt(1);
    const lastNameHeader = tr.childAt(2);


    firstNameHeader.simulate('click', {});
    expect(sortFn).toHaveBeenCalled();
    expect(sortFn.mock.results[0].value).toEqual('firstName');

    lastNameHeader.simulate('click', {});
    expect(sortFn).toHaveBeenCalled();
    expect(sortFn.mock.results[1].value).toEqual('lastName');
  });
});
