import { shallow } from 'enzyme';

import AuthorForm from '../AuthorForm';

const onSave = jest.fn();
const onChange = jest.fn();

const props = {
  author: {},
  onSave,
  onChange,
};

describe('Course Form component', () => {
  test('test events from the form', () => {
    const wrapper = shallow(<AuthorForm {...props} />);

    wrapper.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalled();
  });
});
