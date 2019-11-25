import React, { Component } from "react";
// import firebase from 'firebaseui'
import { myHistory } from "../index";
import Logo from "../images/logo.png";
import ProfilePic from "../images/profilepic.png";

export default class SignIn extends Component {
  state = {
    loginPage: true
  };
  login = () => {
    this.setState({
      loginPage: false
    });
    myHistory.push("/map/");
  };
  render() {
    return (
      <div className={this.state.loginPage ? "login hide" : "login hide"}>
        <div className="login-menu">
         
            <img src={Logo} alt="SportsVybe Logo" className="logo" />
       
          <h2>Welcome Back, Avrahm!</h2>
          <img src={ProfilePic} alt="Profile Pic" className="profile-pic"  />
          <h4>Avrahm Kleinholz</h4>
          <button onClick={this.login}>Log In</button>
        </div>
      </div>
    );
  }
}
