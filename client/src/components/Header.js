import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
      <div class="header">
        <div class="bounds">
          <h1 class="header--logo">Courses</h1>
          <nav><span>Welcome Joe Smith!</span><a class="signout" href="index.html">Sign Out</a></nav>
        </div>
      </div>
    );
  }
}