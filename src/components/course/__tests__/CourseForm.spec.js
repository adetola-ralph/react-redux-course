import { shallow } from 'enzyme';

import CourseForm from '../CourseForm';

const onSave = jest.fn();
const onChange = jest.fn();

const props = {
  course: {},
  allAuthors: [],
  onSave,
  onChange,
};

describe('Course Form component', () => {
  test('test events from the form', () => {
    const wrapper = shallow(<CourseForm {...props} />);

    wrapper.find('form').simulate('submit');
    expect(onSave).toHaveBeenCalled();
  });
});
