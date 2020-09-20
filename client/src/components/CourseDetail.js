import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {

  // constructor(props) {
  //   super(props);

  // }



  state = {
    course: "",
    creator: "",

  }

  //this method is best to make api calls
  componentDidMount() {
    const { context } = this.props;
    context.data.courseDetail(this.props.match.params.id)
      .then((data) =>
        this.setState({ course: data, creator: data.creator }, () => console.log(this.state.course))
      );
    // ISSUE WITH SET STATE


  }


  // deleteCourse() {

  // const context = this.props.context; //props undefined?
  // console.log('estbutton');
  // context.data.deleteCourse(this.state.course.id)

  // }

  deleteCourse = () => {
    console.log(this.props)
    const context = this.props.context;
    console.log('estbutton');
    context.data.deleteCourse(this.state.course.id)
  }
  render() {
    const { title, description, materialsNeeded, estimatedTime, } = this.state.course;

    const { firstName, lastName } = this.state.creator;

    const name = "by " + firstName + " " + lastName;

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    console.log(authUser); // may not require this

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><Link className="button" to={`${this.props.match.params.id}/update`}>Update Course</Link><Link className="button" onClick={this.deleteCourse} to="/">Delete Course</Link></span><Link
              className="button button-secondary" to="/">Return to List</Link></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>{name}</p>
            </div>
            <div className="course--description">

              <ReactMarkdown source={description} />

            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li><ReactMarkdown source={materialsNeeded} /></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
