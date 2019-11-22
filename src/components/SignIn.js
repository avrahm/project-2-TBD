import React, { Component } from "react";

export default class SignIn extends Component {
  state = {
    loginPage: true
  };
  login = () => {
    this.setState({
      loginPage: false
    });
  };
  render() {
    return (
      <div className={this.state.loginPage ? "login hide" : "login hide"}>
        Avrahm Kleinholz
        <button onClick={this.login}>Log In</button>
      </div>
    );
  }
}
