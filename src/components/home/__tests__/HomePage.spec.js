import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
const { mount } = Enzyme;

import HomePage from '../HomePage';

let wrapper;

describe('Home page component', () => {
  // TODO: test this more extensively
  // beforeAll(() => {
  //   wrapper = mount(<HomePage />);
  // });

  test('Snapshot', () => {
    const tree = create(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
