import configureStore from '../configureStore';
import rootReducer from '../../reducers';

jest.mock('../../reducers');
rootReducer.mockImplementation(() => ({
  course: {},
}));

describe('Configure store', () => {
  test('store creation', () => {
    const store = configureStore();
    expect(rootReducer).toHaveBeenCalled();
    expect(store.getState()).toEqual({ course: {} });
  });
});
