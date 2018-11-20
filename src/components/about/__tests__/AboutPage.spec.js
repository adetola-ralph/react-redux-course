import { create } from 'react-test-renderer';
const { mount } = Enzyme;

import AboutPage from '../AboutPage';

let wrapper;

describe('ABout page component', () => {
  beforeAll(() => {
    wrapper = mount(<AboutPage />);
  });

  it('should render without error', () => {
    const h1Tag = wrapper.find('h1');
    const pTag = wrapper.find('p');

    expect(h1Tag.text()).toEqual('About');
    expect(pTag.text()).toEqual('This application uses React, Redux, React Router and a variety of other helpful libraries');
  });

  test('Snapshot', () => {
    const tree = create(<AboutPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
