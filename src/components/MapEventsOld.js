import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindowEx";
import { myHistory } from "../index.js";
// import UserMarker from "./UserMarker";
import FilterMenu from "./FilterMenu"
import parkImg from "../images/park-map.png"
import eventImg from "../images/league-map.png"
import Loading from "./Loading/Loading.js"

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
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



  render() {
    if (this.props.ready) {
    return (
      <div>
        <Map
          google={this.props.google}
          className={"map"}
          zoom={12}
          initialCenter={this.props.center}
          center={{
            lat: this.props.userLocation.latitude,
            lng: this.props.userLocation.longitude
          }}
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
          <Marker
                key={"User"}
                name={"User Location"}
                position={{
                  lat: this.props.userLocation.latitude,
                  lng: this.props.userLocation.longitude
                }}
              />
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
    ); } else {
      return <Loading />;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
})(MapContainer);
