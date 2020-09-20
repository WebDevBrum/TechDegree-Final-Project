import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReactMarkdown from "react-markdown";

export default class UpdateCourse extends Component {

  state = {
    id: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
    creator: "",
    errors: []

  }

  componentDidMount() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    context.data.courseDetail(this.props.match.params.id)
      .then((data) => {
        if (authUser.id === data.creator.id) {
          this.setState({
            id: data.id,
            title: data.title,
            description: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded,
            userId: data.creator.id,
            creator: data.creator
          }, () => console.log(this.state.estimatedTime))
        } else {
          this.props.history.push("/forbidden");
        }
      }
      );
  }

  // updateCourse = (event) => {
  //   console.log(this.props)
  //   const context = this.props.context;
  //   console.log('estbutton');
  //   context.data.updateCourse(this.state.course.id)
  // }



  render() {

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    console.log(authUser.id);


    const { userId, title, description, estimatedTime, materialsNeeded, errors } = this.state;

    console.log(this.state.userId);
    const { firstName, lastName } = this.state.creator;

    const name = "by " + firstName + " " + lastName;


    return (

      <div className="bounds course--detail">

        <ErrorsDisplay errors={errors} />
        <h1>Update Course</h1>
        <div>
          <form>
            <div className="grid-66">
              <div className="course--header">

                <h4 className="course--label">Course</h4>


                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                  onChange={this.change}
                  value={title} /></div>
                <p>{name}</p>
              </div>


              <div className="course--description">
                <div><textarea id="description" name="description" onChange={this.change} value={description} className="" placeholder="Course description..." /></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">

                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                      placeholder="Hours" onChange={this.change} value={estimatedTime} /></div>
                  </li>
                  <li className="course--stats--list--item">

                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" onChange={this.change} value={materialsNeeded} className="" placeholder="List materials..." /></div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid-100 pad-bottom"><button className="button" onClick={this.submit} type="submit">Update Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
          </form>
        </div>

      </div>
    );

  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }



  submit = (event) => {
    event.preventDefault();


    const { context } = this.props;

    const { emailAddress, password } = context.authenticatedUser;
    const {
      id, title, description, estimatedTime, materialsNeeded,

    } = this.state;

    const userId = this.state.creator.id;
    // New user payload
    const course = {
      id, title, description, estimatedTime, materialsNeeded, userId

    };



    context.data.updateCourse(id, course, emailAddress, password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
          window.scrollTo(0, 0);
        } else {
          this.props.history.push(`/courses/${id}`)
        }
      })
      .catch(err => { // handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push to history stack
      });

    console.log(course);
    console.log("submit button clicked")


  }

  cancel = (event) => {
    event.preventDefault();
    console.log(this.state.course.id);


    const location = `/courses/${this.state.course.id}`
    this.props.history.push(location);
  }






}
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
