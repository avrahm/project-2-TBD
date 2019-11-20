import React, { Component } from "react";
import Axios from "axios";
// import Header from "../HomeHeader/HomeHeader";

export default class AddNewEvent extends Component {
  constructor() {
    super();
    this.state = {
      
        name: "",
        address: "",
        description: "",
        sport: "",
        date: "",
        time: "",
        user: "",
        message: ""
      
    };
  }
  handleInput = e => {
    // console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // submitNewEvent = e => {
  //   e.preventDefault();

  //   const event = { 
  //     name: this.state.name,
  //     address: this.state.address,
  //     description: this.state.description,
  //     sport: this.state.sport,
  //     date: this.state.date,
  //     time: this.state.time,
  //     user: this.state.user
  //   }
    
  
    
  //   Axios.post("https://ironrest.herokuapp.com/avrahm", {event: {event}})
  //   .then(res => {
  //     // console.log(event)
  //     // console.log(res)
  //     this.setState({
  //       message: "Posted Successfully"
  //     })
  //   })
  //   .catch(err => {
  //     // console.error(err)
  //     this.setState({
  //       message: "Error!"
  //     })
  //   })
  // };

  render() {
    return (
      <div>
      {/* <Header /> */}
      <h1>{this.props.message}</h1>
        <form className="container" onSubmit={e => {
            this.props.submitEventFunction(
              e,
              this.state.name,
              this.state.address,
              this.state.description,
              this.state.sport,
              this.state.date,
              this.state.time,
              this.state.user
            );
            console.log(this.props)
          }}>
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={this.handleInput}
            value={this.state.name}
          />
          <label htmlFor="address">Address</label>
          <input
            className="form-control"
            type="text"
            name="address"
            onChange={this.handleInput}
            value={this.state.address}
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            type="text"
            name="description"
            height="100px"
            onChange={this.handleInput}
            value={this.state.description}
          ></textarea>
          <label htmlFor="sport">Sport</label>
          <input
            className="form-control"
            type="text"
            name="sport"
            onChange={this.handleInput}
            value={this.state.sport}
          />
          <label htmlFor="date">Date</label>
          <input
            className="form-control"
            type="text"
            name="date"
            onChange={this.handleInput}
            value={this.state.date}
          />
          <label htmlFor="time">Time</label>
          <input
            className="form-control"
            type="text"
            name="time"
            onChange={this.handleInput}
            value={this.state.time}
          />
          <label htmlFor="user">User</label>
          <input
            className="form-control"
            type="text"
            name="user"
            onChange={this.handleInput}
            value={this.state.user}
          />
          <button className="button btn-lg">Submit</button>
        </form>
      </div>
    );
  }
}
