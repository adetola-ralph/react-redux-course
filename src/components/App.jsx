import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Home from './home/HomePage';
import About from './about/AboutPage';

const App = () => (
  <Router>
    <div className="container-fluid">
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </div>
  </Router>
);

export default App;
