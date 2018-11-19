import { create } from 'react-test-renderer';

// Component
import FormError from '../FormError';

describe('Form Error component', () => {
  it('shouldn\'t render when there are no errors', () => {
    const tree = create(<FormError />);
    const instance = tree.root;

    expect(instance.children).toHaveLength(0);
  });

  it('should render when there are errors', () => {
    const props = {
      errors: ['This is an error message'],
    };

    const { root } = create(<FormError {...props} />);

    expect(root.children).toHaveLength(1);

    const errorNodes = root.findAllByProps({ className: 'error-message' });
    expect(errorNodes[0].children[0]).toEqual('This is an error message');
  });

  it('should render when there are multiple errors', () => {
    const props = {
      errors: ['This is an error message', 'Another error message'],
    };

    const { root } = create(<FormError {...props} />);

    expect(root.children).toHaveLength(2);

    const errorNodes = root.findAllByProps({ className: 'error-message' });
    expect(errorNodes[0].children[0]).toEqual('This is an error message');
    expect(errorNodes[1].children[0]).toEqual('Another error message');
  });
});
