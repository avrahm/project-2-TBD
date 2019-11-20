import React from "react";
// import axios from "axios";
// import Header from "../Header/Header";
// import Axios from "axios";

function importAll(r) {
  let images = {};
   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));



class SingleEvent extends React.Component {
  render() {
    // console.log(this.state.theEvent)

    if (this.props.listOfEvents) {
      let theEventDetails = this.props.listOfEvents.find(event => {
        return event._id === this.props.match.params.id;
      });
      let theEvent = theEventDetails.event;
      return (
        <div className="App">
          {/* <Header /> */}
          <img src={images[theEvent.img]} alt={theEvent.title} height="200px" />
          <h1>Title: {theEvent.title}</h1>
          <h2>Location: {theEvent.location}</h2>
          <h2>Description: {theEvent.description}</h2>
          <h2>Sport: {theEvent.sport}</h2>
          <h2>Date: {theEvent.date}</h2>
          <h2>Time: {theEvent.time}</h2>
          <h2>Img: {theEvent.img}</h2>
          <h2>User: {theEvent.user}</h2>
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
}

export default SingleEvent;
