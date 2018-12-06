import configureStore from '../configureStore';

jest.mock('../../reducers');
import rootReducer from '../../reducers';
rootReducer.mockImplementation(() => {
  return {
    course: {},
  };
});

describe('Configure store', () => {
  test('store creation', () => {
    const store = configureStore();
    expect(rootReducer).toHaveBeenCalled();
    expect(store.getState()).toEqual({ course: {} });
  });
});
