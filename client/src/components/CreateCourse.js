import React, { Component } from 'react';

export default class CreateCourse extends Component {

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

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { firstName, lastName } = authUser;
    const name = "by " + firstName + " " + lastName;

    const { title, description, estimatedTime, materialsNeeded, errors } = this.state;

    return (
      <div className="bounds course--detail">
        <ErrorsDisplay errors={errors} />
        <h1>Create Course</h1>
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
            <div className="grid-100 pad-bottom"><button className="button" onClick={this.submit} type="submit">Create Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
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
    const authUser = context.authenticatedUser;
    const userId = authUser.id;

    const { emailAddress, password } = context.authenticatedUser;
    const { title, description, estimatedTime, materialsNeeded,
    } = this.state;

    // New user payload
    const course = {
      title, description, estimatedTime, materialsNeeded, userId
    };
    /*Creates a course when valid info provided, info passed to api and course added to database*/
    context.data.createCourse(course, emailAddress, password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
          window.scrollTo(0, 0);
        } else {
          this.props.history.push(`/`)
        }
      })
      .catch(err => { // handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push to history stack
      });
  }

  cancel = (event) => {
    event.preventDefault();
    this.props.history.push('/');
  }
}

/** Passes any validation errors to component render method  */
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