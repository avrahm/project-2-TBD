import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
// import { geolocated } from "react-geolocated";
// import MarkerCluster from '@google/markerclusterer'
import { geolocated } from "react-geolocated";
import Header from "./Header/Header";
import Loading from "../components/Loading/loading";

export default class Map extends Component {
  state = {
    center: {
      lat: 25.7617,
      lng: -80.1918
    },
    zoom: 10,
    message: ""
    // parks: []
  };
  showParks = () => {
    return this.props.listOfParks.map((eachPark, i) => {
      return (
        <Marker
          key={i}
          lat={eachPark.attributes.LAT}
          lng={eachPark.attributes.LON}
          text="My Marker"
        />
      );
    });
  };

  filterParksBySport = e => {
    console.log(e.target.checked);
    console.log(e.target.name);
    console.log(this.props.listOfParks);
  };
  render() {
    // setTimeout(() => {
    //   this.setState({parks:[...this.props.listOfParks]})
    // }, (this.props.listOfParks));

    if (this.props.listOfParks)
      return (
        <div>
          <h1>{this.state.message}</h1>
          <GoogleMapReact
            style={{ height: "100vh", width: "100%" }}
            bootstrapURLKeys={{
              key: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            {this.showParks()}
          </GoogleMapReact>
          <div className="menu">
            <h1>Filter</h1>
            basketball:{" "}
            <input
              type="checkbox"
              name="basketball"
              onClick={this.props.parkFilterFunction}
              // onClick={this.eventHandler}
            />
            <br />
            soccer:{" "}
            <input
              type="checkbox"
              name="soccer"
              onClick={this.props.parkFilterFunction}
              // onClick={this.eventHandler}
            />
            <br />
            baseball:{" "}
            <input
              type="checkbox"
              name="baseball"
              onClick={this.props.parkFilterFunction}
              // onClick={this.eventHandler}
            />
            <br />
            yoga:{" "}
            <input
              type="checkbox"
              name="yoga"
              onClick={this.props.parkFilterFunction}
              // onClick={this.eventHandler}
            />
          </div>
          <Header />
        </div>
      );
    else return <Loading />;
  }
}
