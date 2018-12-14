import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

import HomePage from '../HomePage';

describe('Home page component', () => {
  test('Snapshot', () => {
    const tree = create(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
