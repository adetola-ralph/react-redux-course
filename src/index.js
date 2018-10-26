import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// App component
import App from './components/App';

// Store
import configureStore from './store/configureStore';

// Actions
import { loadCourses } from './actions/courseActions';
import { loadAuthor } from './actions/authorActions';

// Styles
import '~/bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthor());

render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#app'),
);
