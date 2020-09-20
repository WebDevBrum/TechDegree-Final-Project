import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {

  state = {
    course: "",
    creator: "",

    id: ""
  }

  /*Calls courseDetail to obtain details on the course, this method is best to make api calls*/
  componentDidMount() {
    const { context } = this.props;

    context.data.courseDetail(this.props.match.params.id)
      .then((data) => {
        if (data === null) {
          this.props.history.push('/notfound');
        } else {
          this.setState({ course: data, creator: data.creator, id: data.id }, () => console.log(this.state.id))
        }
      }
      );
  }


  deleteCourse = () => {
    const { context } = this.props;
    const { emailAddress, password } = context.authenticatedUser;
    const { id } = this.state;
    context.data.deleteCourse(id, emailAddress, password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
          window.scrollTo(0, 0);
        } else {
          window.location.href = "/";
        }
      })
      .catch(err => { // handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push to history stack
      });
  }


  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    let authId = 0;

    const { title, description, materialsNeeded, estimatedTime, } = this.state.course;

    const { id, firstName, lastName } = this.state.creator;

    const name = "by " + firstName + " " + lastName;



    /*for comparion of the course user with the current authorised user. We then render buttons based on level of access */
    if (authUser !== null) {
      authId = authUser.id;
    }
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {authId === id ?
                <React.Fragment>
                  <span><Link className="button" to={`${this.props.match.params.id}/update`}>Update Course</Link>
                    <Link className="button" onClick={this.deleteCourse} to="/">Delete Course</Link></span>
                  <Link
                    className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
                :
                <React.Fragment>
                  <Link
                    className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
              }
            </div>
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
