import React from "react";
// import axios from "axios";
// import Header from "../Header/Header";
// import Axios from "axios";

class SingleEvent extends React.Component {
  
  

  render(){
    // console.log(this.state.theEvent)


    if (this.props.listOfEvents) {


      let theEvent = this.props.listOfEvents.find(event => {
        return event._id === this.props.match.params.id;
      });
      return (
        <div className="App">
        {/* <Header /> */}
          SingleEvent
          {theEvent._id}
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
}

export default SingleEvent;
