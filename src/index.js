import React from 'react';
import { render } from 'react-dom';

// App component
import App from './components/App';

// Styles
import './styles/styles.css';
import '~/bootstrap/dist/css/bootstrap.css';

render(<App />, document.querySelector('#app'));
