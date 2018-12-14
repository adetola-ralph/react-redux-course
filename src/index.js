import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// App component
import AppComponent from './components/App';

// Store
import configureStore from './store/configureStore';

// Actions
import { loadCourses } from './actions/courseActions';
import { loadAuthor } from './actions/authorActions';

// Styles
import '~/@fortawesome/fontawesome-free/css/all.css';
import '~/bootstrap/dist/css/bootstrap.css';
import '~/toastr/build/toastr.min.css';
import './styles/styles.css';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthor());

render(
  <Provider store={store}>
    <AppComponent />
  </Provider>, document.querySelector('#app'),
);
