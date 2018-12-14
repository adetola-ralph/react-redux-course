import { create } from 'react-test-renderer';

import { App } from '../App';

describe('App component', () => {
  test('Snapshot', () => {
    const tree = create(<App loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
