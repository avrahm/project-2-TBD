import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindowEx";
import { myHistory } from "../index.js";
// import UserMarker from "./UserMarker";
import FilterMenu from "./FilterMenu"
import parkImg from "../images/park-map.png"
import eventImg from "../images/league-map.png"

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      userLocation: {
        latitude: 0,
        longitude: 0
      },
      showDetailsLink: '',
    };
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props.id)
    if(props.id==="park"){
      this.setState({
        selectedPlace: props.place_,
        selectedPlaceName: props.place_.attributes.NAME,
        selectedPlaceId: props.place_.attributes.ID,
        selectedPlaceLink: "/singlepark/",
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
    else if(props.id==="event"){
    this.setState({
      selectedPlace: props.place_,
      selectedPlaceName: props.place_.event.title,
      selectedPlaceId: props.place_._id,
      selectedPlaceLink: "/singleevent/",
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
}

  showDetails = () => {
    myHistory.push(this.state.selectedPlaceLink+this.state.selectedPlaceId)
   
  };

  getLocation = () => {
    // console.log("get location");
    let geo_success = position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude

        }
        // center: {
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // },
      });
    };

    let geo_error = () => {
      console.log("Sorry, no position available.");
    };

    let geo_options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 7000
    };

    navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
  };

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          className={"map"}
          zoom={12}
          initialCenter={this.props.center}
        >
          {this.props.parkData.map((place, i) => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                key={i}
                id={"park"}
                place_={place}
                icon={{ url: parkImg }}
                position={{
                  lat: place.attributes.LAT,
                  lng: place.attributes.LON
                }}
                // icon={"../images/park-map.png"}
              />
            );
          })}
          {this.props.eventData.map((place, i) => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                key={place._id}
                id={"event"}
                place_={place}
                icon={{ url: eventImg }}
                position={{ lat: place.event.location.lat, lng: place.event.location.lon }}
              />
            );
          })}
          {/* <Marker
                key={"User"}
                name={"User Location"}
                position={{
                  lat: this.state.userLocation.latitude,
                  lng: this.state.userLocation.longitude
                }}
              /> */}
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
        <FilterMenu selectedOption={this.props.selectedOption} filterFunction={this.props.filterFunction} />
         </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
})(MapContainer);
