import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// Components
import Home from './home/HomePage';
import About from './about/AboutPage';
import Courses from './course/CoursesPage';

import Header from './common/Header';

const customHistory = createBrowserHistory();

const App = () => (
  <Router history={customHistory}>
    <div className="container-fluid">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/courses" component={Courses} />
    </div>
  </Router>
);

export default App;
