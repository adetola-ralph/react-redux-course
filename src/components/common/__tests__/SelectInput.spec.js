const { mount, shallow } = Enzyme;

import SelectInput from '../SelectInput';

const onChangeMock = jest.fn((e) => e.value);

const defaultProps = {
  name: 'Select',
  label: 'Select',
  value: '',
  defaultValue: '',
  options: [{
    value: 'oreofe',
    text: 'Oreofe',
  }],
  onChange: onChangeMock,
  errors: [],
};

describe('Select input component', () => {
  it('should render a select field', () => {
    const wrapper = mount(<SelectInput {...defaultProps} />);

    const selectField = wrapper.find('select');

    const props = selectField.props();
    expect(props.name).toEqual('Select');
    expect(props.value).toEqual('');

    const options = wrapper.find('option');
    expect(options.at(1).text()).toEqual('Oreofe');
    expect(options.at(1).props().value).toEqual('oreofe');
  });

  it('should render a label for input field', () => {
    const wrapper = mount(<SelectInput {...defaultProps} />);

    const labelField = wrapper.find('label');

    const props = labelField.props();
    expect(props.htmlFor).toEqual('Select');
    expect(labelField.text()).toEqual('Select');
  });

  it('error', () => {
    const wrapper = mount(<SelectInput {...defaultProps} errors={['error1']} />);

    const errors = wrapper.find('div.error-message');
    expect(errors).toHaveLength(1);
    expect(errors.slice(0, 1).text()).toEqual('error1');
  });
});
