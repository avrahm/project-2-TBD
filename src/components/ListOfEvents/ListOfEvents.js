import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Header from "../Header/Header";
import Axios from 'axios'

export default class ListOfEvents extends Component {
constructor(){
  super()
  this.state = {
    // listOfEvents: {...this.props.listOfEvents}
  }
}
  deleteEvent = (e) => {
   let deleteId = e.target.name
    Axios.delete('https://ironrest.herokuapp.com/avrahm/'+ deleteId)
    .then(res=>{
      console.log('deleted')
      // this.setState({
      //   listOfEvents: res})
      })
      .catch(err=>{
        console.log(err)
      })
    
    // console.log(e.target.name)
  }

  showEvents = () => {
    // console.log(this.props.listOfEvents.event.name)
    return this.props.listOfEvents.map((eachEvent, i) => {
      // console.log(eachEvent)

      return (
        <div className="container d-flex flex-row" key={i}>
          {/* <div className="col-4">
            <img src={eachEvent.fac} alt={eachEvent.name} height="100px" />
          </div> */}
          <div className="col-8">
            <Link to={"/singleevent/" + eachEvent._id}>
              <h4 className="name">{eachEvent.event.name}</h4></Link><button name={eachEvent._id} onClick={this.deleteEvent}>delete</button>
            
            {/* Date: {eachEvent[i].date} */}
            {/* <p className="contributor">Phone: {eachEvent.PHONE}</p> */}
          </div>
        </div>
      );
    });
  };



  render() {
    // console.log(this.props.listOfEvents)
    // console.log(this.props.listOfEvents)
    if(this.props.ready)
    return (

      <div>
        {/* <Header /> */}

        <h1>List of Events</h1>

        {this.showEvents()}

      </div>
    )
    else
    return(<div>Loading...</div>)
  }
}
