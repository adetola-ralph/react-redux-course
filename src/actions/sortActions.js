import { SORT } from './actionTypes';

const sortList = (sortBy, sortOrder, list) => ({
  type: SORT,
  sortBy,
  sortOrder,
  list,
});

export default sortList;
