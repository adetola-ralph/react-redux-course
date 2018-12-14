import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import AuthorListRow from '../AuthorListRow';


const props = {
  author: {
    firstName: 'John',
    lastName: 'Doe',
    id: '1',
  },
};

describe('Author List Row component', () => {
  it('should render a table row', () => {
    const wrapper = mount(
      <MemoryRouter>
        <table>
          <tbody>
            <AuthorListRow {...props} />
          </tbody>
        </table>
      </MemoryRouter>
    );

    const tr = wrapper.find('tr');
    expect(tr.children().length).toEqual(3);

    const firstNameColumn = tr.childAt(1);
    const lastNameColumn = tr.childAt(2);

    expect(firstNameColumn.text()).toEqual('John');
    expect(lastNameColumn.text()).toEqual('Doe');
  });
});
