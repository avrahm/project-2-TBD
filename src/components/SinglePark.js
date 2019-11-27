import React from "react";
import Loading from "./Loading/Loading.js";
import EventCard from "./EventCard";
import MapComponent from "./MapComponent";

class ParkPage extends React.Component {
  //find events for the list of event that match the current park
  eventsAtThisPark = () => {
    let copyOfParkList = this.props.listOfEvents.map((events, i) => {
      if (events.event.location.id === this.props.match.params.id) {
        return <EventCard eachEvent={events} key={i} />;
      }
    });
    return copyOfParkList;
  };

  render() {
    // console.log(this.props.distanceFunction)
    //if the list of parks has loaded then return the data
    if (this.props.listOfParks && this.props.listOfEvents) {
      //find the correct park by id from the props list of parks
      let thePark = this.props.listOfParks.find(park => {
        return park.attributes.ID === this.props.match.params.id;
      });

      return (
        <div>
          <div className="container d-flex flex-column">
            <div className="row">
              <div className="col-12">
                <h1>{thePark.attributes.NAME}</h1>
              </div>
              <div className="col-12 col-md-6">
                <h3 className="tagline">
                  Address: {thePark.attributes.ADDRESS}
                </h3>
                <p>Phone: {thePark.attributes.PHONE}</p>
                <p>Distance:{" "}
                {this.props.distanceFunction(
                  this.props.userLocation.latitude,
                  this.props.userLocation.longitude,
                  thePark.attributes.LAT,
                  thePark.attributes.LON,
                  "N"
                )}</p>
                <h3>Sports</h3>
                <p>Basketball: {thePark.attributes.BASKETBALL}</p>
                <p>Soccer: {thePark.attributes.SOCCER}</p>
                <p>Baseball: {thePark.attributes.BASEBALL}</p>
                <p>Volleyball: {thePark.attributes.VOLLEYBALL}</p>
              </div>
              <div className="col-12 col-md-6 align-items-center">
                <MapComponent
                  lat={thePark.attributes.LAT}
                  lon={thePark.attributes.LON}
                  details={thePark}
                  id="park"
                />
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="row">
              <div className="col-12">
                <h3>Events</h3>
                <div className="d-flex flex-wrap justify-content-center">
                  {this.eventsAtThisPark()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
export default ParkPage;
