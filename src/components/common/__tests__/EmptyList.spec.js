import { create } from 'react-test-renderer';

// Component
import EmptyList from '../EmptyList';

describe('Empty List component', () => {
  it('should render with appropriate props', () => {
    const props = {
      buttonMessage: 'Yo there, click me',
      buttonAction: () => 'You clicked me, yaa!',
    };

    const tree = create(<EmptyList {...props} />);
    const instance = tree.root;

    const messageNode = instance.findByProps({ className: 'text-center message' });
    const btnNode = instance.findByProps({ type: 'button' });

    expect(messageNode).not.toBeNull();
    expect(messageNode.children[0]).toEqual('Nothing to see here, please move along');
    expect(btnNode.children[0]).toEqual('Yo there, click me');
  });

  it('should render with propvided props', () => {
    const props = {
      buttonMessage: 'Yo there, click me',
      buttonAction: () => 'You clicked me, yaa!',
      message: 'Hi there, I think you missed your way',
    };

    const tree = create(<EmptyList {...props} />);
    const instance = tree.root;

    const messageNode = instance.findByProps({ className: 'text-center message' });
    const btnNode = instance.findByProps({ type: 'button' });

    expect(messageNode).not.toBeNull();
    expect(messageNode.children[0]).toEqual('Hi there, I think you missed your way');
    expect(btnNode.children[0]).toEqual('Yo there, click me');
  });

  it('should expect buttonAction prop to be called when button is clicked', () => {
    const mockFn = jest.fn(() => 'You clicked me, yaa!');
    const props = {
      buttonMessage: 'Yo there, click me',
      buttonAction: mockFn,
    };

    const tree = create(<EmptyList {...props} />);
    const instance = tree.root;

    const btnNode = instance.findByProps({ type: 'button' });
    btnNode.props.onClick();
    expect(mockFn).toHaveBeenCalled();
  });
});
