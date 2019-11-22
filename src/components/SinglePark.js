import React from "react";
// import Header from "../Header/Header";
import { Link } from "react-router-dom";
import Loading from "./Loading/loading";

class Single extends React.Component {
  //find events for the list of event that match the current park
  eventsAtThisPark = () => {
    let copyOfParkList = this.props.listOfEvents.map((events, i) => {
      if (events.event.location.id === this.props.match.params.id) {
        return (
          <li key={i}>
            <Link to={"/singleevent/" + events._id}>{events.event.title}</Link>
          </li>
        );
      }
    });
    return copyOfParkList;
  };

  render() {
    //if the list of parks has loaded then return the data
    if (this.props.listOfParks && this.props.listOfEvents) {
      //find the correct park by id from the props list of parks
      let thePark = this.props.listOfParks.find(park => {
        return park.attributes.ID === this.props.match.params.id;
      });

      return (
        <div>
          {/* <Header /> */}
          <div className="container d-flex flex-column">
            <div>
              <h1>{thePark.attributes.NAME}</h1>
              <h3 className="tagline">Address: {thePark.attributes.ADDRESS}</h3>
              <p>Phone: {thePark.attributes.PHONE}</p>
              <p>Latitude: {thePark.attributes.LAT}</p>
              <p>Longitude: {thePark.attributes.LON}</p>
              <hr />
              <h3>Sports</h3>
              <p>Basketball: {thePark.attributes.BASKETBALL}</p>
              <p>Soccer: {thePark.attributes.SOCCER}</p>
              <p>Baseball: {thePark.attributes.BASEBALL}</p>
              <h3>Events</h3>
              {this.eventsAtThisPark()}
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
export default Single;
