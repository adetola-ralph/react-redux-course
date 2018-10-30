import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Home from './home/HomePage';
import About from './about/AboutPage';
import Authors from './author/AuthorPage';
import Courses from './course/CoursesPage';
import ManageAuthor from './author/ManageAuthor';
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

const App = ({ loading }) => (
  <Router history={customHistory}>
    <div className="container-fluid">
      <Header loading={loading} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/authors" component={Authors} />
        <Route exact path="/course/:id?" component={ManageCourse} />
        <Route exact path="/author/:id?" component={ManageAuthor} />
        <Route component={NotFoundComponent} />
      </Switch>
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
