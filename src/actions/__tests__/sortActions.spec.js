import { SORT } from '../actionTypes';
import sortList from '../sortActions';

describe('Sort action creators', () => {
  it('should create action for sort list call', () => {
    expect(sortList()).toEqual({
      type: SORT,
    });
  });
});
