import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';

import Header from '../Header';
import LoadingDots from '../LoadingDots';

describe('Header component', () => {
  test('Snapshot', () => {
    const tree = create(
      <MemoryRouter>
        <Header loading/>
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should contain loading dots component when loading is true', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Header loading/>
      </MemoryRouter>
    );

    expect(wrapper.find(LoadingDots)).toHaveLength(1);
  });

  test('should contain loading dots component when loading is false', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Header loading={false}/>
      </MemoryRouter>
    );

    expect(wrapper.find(LoadingDots)).toHaveLength(0);
  });
});
