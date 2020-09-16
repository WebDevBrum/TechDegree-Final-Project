import React, { Component } from 'react';

export default class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }





  render() {

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;



    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form>
              <div><input
                id="firstName"
                name="firstName"
                type="text" className="" placeholder="First Name"
                onChange={this.change}
                value={firstName} /></div>
              <div><input
                id="lastName"
                name="lastName"
                type="text" className="" placeholder="Last Name"
                onChange={this.change}
                value={lastName} /></div>
              <div><input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                onChange={this.change}
                value={emailAddress} /></div>
              <div><input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                onChange={this.change}
                value={password} /></div>
              <div><input
                id="confirmPassword" name="confirmPassword"
                type="password"
                className=""
                placeholder="Confirm Password"
                onChange={this.change}
                value={password} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit" onClick={this.submit}>Sign Up</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
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


  submit = () => {
    const { context } = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    context.data.createUser(user)
      .then(errors => {
        if (errors.length) {
          // this.setState({ errors });
          console.log(errors);
        } else {
          console.log(`${emailAddress} is successfully signed up and authenticated!`);
        }
      })
      .catch(err => { // handle rejected promises
        console.log(err);
        this.props.history.push('/error'); // push to history stack goes to not found route

      });
  }

  cancel = () => {
    this.props.history.push('/');
  }

}

