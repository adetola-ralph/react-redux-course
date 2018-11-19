import React from 'react';
import { create } from 'react-test-renderer';

import SortArrowComponent from '../SortArrowComponent';

describe('Sort Arrow Component', () => {
  it('should render a desc arrow by default', () => {
    const { root } = create(<SortArrowComponent display />);

    const child = root.findByType('i');

    expect(child.props.className).toEqual('fas fa-arrow-up');
  });

  it('should render a desc arrow when order is desc', () => {
    const { root } = create(<SortArrowComponent display order="desc" />);

    const child = root.findByType('i');

    expect(child.props.className).toEqual('fas fa-arrow-up');
  });

  it('should render a asc arrow when order is asc', () => {
    const { root } = create(<SortArrowComponent display order="asc" />);

    const child = root.findByType('i');

    expect(child.props.className).toEqual('fas fa-arrow-down');
  });

  it('should display nothing if display is false', () => {
    const { root } = create(<SortArrowComponent />);

    expect(root.children[0]).toEqual('');
  });
});
