import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';

export default class Courses extends Component {

  state = {
    courses: []
  }

  /*Calls getCourses to obtain details on the course list, this method is best to make api calls*/
  componentDidMount() {
    const { context } = this.props;
    context.data.getCourses()
      .then((data) =>
        this.setState({ courses: data }));
    console.log(this.state)
  }

  render() {
    const content = this.state.courses.map((course) => {
      return <Course title={course.title}
        id={course.id}
        key={course.id} />
    });
    return (
      <div className="bounds">
        {content}
        <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add">
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>New Course</h3>
        </Link></div>
      </div>
    );
  }
}