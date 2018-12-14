
import TextInput from '../TextInput';

const { mount } = Enzyme;
const onChangeMock = jest.fn(e => e.value);

const defaultProps = {
  name: 'Name',
  label: 'Your name',
  value: '',
  placeholder: '',
  onChange: onChangeMock,
  errors: [],
};

describe('Text input component', () => {
  it('should render an input field', () => {
    const wrapper = mount(<TextInput {...defaultProps} placeholder="placeholder" />);

    const inputField = wrapper.find('input');

    const props = inputField.props();
    expect(props.type).toEqual('text');
    expect(props.placeholder).toEqual('placeholder');
    expect(props.value).toEqual('');
  });

  it('should render a label for input field', () => {
    const wrapper = mount(<TextInput {...defaultProps} placeholder="placeholder" />);

    const labelField = wrapper.find('label');

    const props = labelField.props();
    expect(props.htmlFor).toEqual('Name');
    expect(labelField.text()).toEqual('Your name');
  });

  it('should call function on input field change', () => {
    const wrapper = mount(<TextInput {...defaultProps} placeholder="placeholder" />);

    const inputField = wrapper.find('input');
    inputField.simulate('change', { value: 'Oreofe' });
    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock.mock.results[0].value).toEqual('Oreofe');
  });

  it('error', () => {
    const wrapper = mount(<TextInput {...defaultProps} placeholder="placeholder" errors={['error1', 'error2']} />);

    const errors = wrapper.find('div.error-message');
    expect(errors).toHaveLength(2);
    expect(errors.slice(0, 1).text()).toEqual('error1');
    expect(errors.slice(1, 2).text()).toEqual('error2');
  });
});
