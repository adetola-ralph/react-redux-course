import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Home from './home/HomePage';
import About from './about/AboutPage';
import Courses from './course/CoursesPage';
import ManageCourse from './course/ManageCoursePage';
import Authors from './author/AuthorPage';

import Header from './common/Header';

const customHistory = createBrowserHistory();

const App = ({ loading }) => (
  <Router history={customHistory}>
    <div className="container-fluid">
      <Header loading={loading} />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/courses" component={Courses} />
      <Route exact path="/authors" component={Authors} />
      <Route exact path="/course/:id?" component={ManageCourse} />
    </div>
  </Router>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.ajaxCallsInProgress > 0,
});

export default connect(mapStateToProps)(App);
