import React from "react";
// import axios from "axios";
import Header from "../Header/Header"

class SingleEvent extends React.Component {
  // state = {
  //   theParks: null,
  //   theEvent: null,
  //   showHeader: true,
  //   ready: false
  // };
  // componentDidMount() {
  //   //Eventful JSON API
  //     axios
  //     .get("http://api.eventful.com/json/events/search?app_key=WzDcqr7H6DmNvzQZ&where=32.746682,-117.162741&within=25")
  //     .then(theResults => {
  //       let x = theResults.events;
  //       this.setState({
  //         theEvent: x,
  //         ready: true
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  render(){
    console.log(this.state.theEvent)
    // let randomPark = this.props.randomPark;
    // let thePark;
    // if (randomPark) {
    //   thePark = this.props.listOfParks.find(park => {
    //     return park.attributes.ID === randomPark;
    //   });
    // } else {
    //   thePark = this.props.listOfParks.find(park => {
    //     return park.attributes.ID === this.props.match.params.id;
    //   });
    // }

    if (this.state.ready) {
      return (
        <div className="App">
        <Header />
          SingleEvent
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
}

export default SingleEvent;
