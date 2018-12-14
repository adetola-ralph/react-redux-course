import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Home from './home/HomePage';
import About from './about/AboutPage';
import Authors from './author/AuthorPage';
import Courses from './course/CoursesPage';
import ManageAuthorPage from './author/ManageAuthor';
import ManageCourse from './course/ManageCoursePage';
import EmptyList from './common/EmptyList';

import Header from './common/Header';

const customHistory = createBrowserHistory();

const NotFoundComponent = ({ history }) => {
  const goToHome = () => history.push('/');

  return (
    <EmptyList buttonAction={goToHome} buttonMessage="Click here to go Home" />
  );
};

NotFoundComponent.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const App = ({ loading, numberOfCourses }) => (
  <Router history={customHistory}>
    <div className="container-fluid">
      <Header loading={loading} numberOfCourses={numberOfCourses} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/authors" component={Authors} />
        <Route exact path="/course/:id?" render={({ match, history }) => <ManageCourse history={history} courseId={match.params.id} />} />
        <Route exact path="/author/:id?" render={({ match, history }) => <ManageAuthorPage history={history} authorId={match.params.id} />} />
        <Route component={NotFoundComponent} />
      </Switch>
    </div>
  </Router>
);

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  numberOfCourses: PropTypes.number,
};

App.defaultProps = {
  numberOfCourses: 0,
};

const mapStateToProps = state => ({
  loading: state.ajaxCallsInProgress > 0,
  numberOfCourses: state.courses.length,
});

export default connect(mapStateToProps)(App);
