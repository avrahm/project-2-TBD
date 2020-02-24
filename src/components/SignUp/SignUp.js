import React, { Component } from 'react'
import Axios from 'axios';
import baseURL from '../../services/base';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {

    constructor(props) {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    handleInput = e => {
        // console.log(this.props)
        this.setState({
          [e.target.name]: e.target.value
        });
      };

    handleSignUpForm = event => {
        event.preventDefault();

        if (this.state.email) {
            let user = {
                email: this.state.email,
                password: this.state.password,
                username: "user" + Math.floor(Math.random() * 500)
            };

            Axios.post(`${baseURL}/api/signup`, user, { withCredentials: true })
                .then(response => {
                    console.log(this.props.userObj)
                    this.setState({
                        email: "",
                        password: ""
                    });
                    this.props.history.push("/map/");
                    this.props.setUser(response.data);
                    this.props.setFlashMessage("Sign up successful", true)
                })
                .catch(err => {
                    this.props.setFlashMessage("Sign up failed", false)
                    console.log(err);
                });
        }
    };

    render() {
        return (
            <div className="login">
                <form className="login-menu"  onSubmit={this.handleSignUpForm}>

                    <h1>Sign Up</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input className="form-control" onChange={this.handleInput} id="email" name="email" type="email" defaultValue={this.state.email} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input className="form-control" onChange={this.handleInput} id="password" name="password" type="password" defaultValue={this.state.password} />

                    </div>

                    {/* <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Agree to Terms of Service</label>
                    </div> */}
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <div>
                    Already have an account? <Link to="/login/">Login</Link>
                    </div>


                </form>


            </div>
        )
    }
}
