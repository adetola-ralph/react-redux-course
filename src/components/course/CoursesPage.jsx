import React, { Component } from 'react';

class CoursesPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: {
        title: '',
      },
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    let { course } = this.state;
    const title = event.target.value;
    course = { ...course, title };

    this.setState({
      course,
    });
  }

  onClickSave(event) {
    event.preventDefault();
    const { course } = this.state;
    const { title } = course;
    alert(`Saving ${title}`);
  }

  render() {
    const { course } = this.state;
    return (
      <div>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        <form onSubmit={this.onClickSave}>
          <input type="text" onChange={this.onTitleChange} value={course.title} />
          <input type="submit" value="save" />
        </form>
      </div>
    );
  }
}

export default CoursesPage;
