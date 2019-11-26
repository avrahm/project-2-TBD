/* global google */
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "../InfoWindowEx";
import { myHistory } from "../../index.js";
import FilterMenu from "../FilterMenu"

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) => {
    // console.log(props.place_.event.title)
    this.setState({
      selectedPlace: props.place_,
      selectedPlaceName: props.place_.event.title,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  showDetails = place => {
    // console.log('3'+this.state.selectedPlace.event.title);
    myHistory.push("/singleevent/" + place._id);
  };

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          className={"map"}
          zoom={12}
          initialCenter={this.props.center}
        >
          {this.props.eventData.map((place, i) => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                key={place._id}
                place_={place}
                name={place.event.title}
                position={{ lat: place.event.location.lat, lng: place.event.location.lon }}
              />
            );
          })}
          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h3>{this.state.selectedPlaceName}</h3>
              <button
                type="button"
                onClick={this.showDetails.bind(this, this.state.selectedPlace)}
              >
                Show details
              </button>
            </div>
          </InfoWindowEx>
        </Map>
          <FilterMenu selectedOption={this.props.selectedOption} filterFunction={this.props.filterFunction}/>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
})(MapContainer);
