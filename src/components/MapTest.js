import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Link } from 'react-router-dom'

export class MapContainer extends React.Component {
  state={
    google: this.props.google,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
 
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  showParks = () => {
    return this.props.listOfParks.map((eachPark, i) => {
      return (
        <Marker key={i} onClick={this.onMarkerClick}
        title={"The marker`s title will appear as a tooltip."}
        name={eachPark.event.title}
        url={"<Link to='/singleevent/"}
        id={eachPark._id}
        position={{ lat: eachPark.event.location.lat, lng: eachPark.event.location.lon }}
      />
      );
    });
  };
  render() {
    const style = {
      width: "80%",
      height: "80%",
      position: "relative"
    };
    // var points = [
    //   { lat: 42.02, lng: -77.01 },
    //   { lat: 42.03, lng: -77.02 },
    //   { lat: 41.03, lng: -77.04 },
    //   { lat: 42.05, lng: -77.02 }
    // ];
    // var bounds = new this.props.google.maps.LatLngBounds();
    // for (var i = 0; i < points.length; i++) {
    //   bounds.extend(points[i]);
    // }
    return (
      <Map
        google={this.state.google}
        style={style}
        className={"map"}
        initialCenter={{
      lat: 25.7617,
      lng: -80.1918
        }}
        zoom={14}
          onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick} name={"Current location"}><Link to="/">TExT</Link>
</Marker>
        {this.showParks()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>

              <h5>{this.state.selectedPlace.name}</h5>
              <h5>{this.state.selectedPlace.url}</h5>
              <h5>{this.state.selectedPlace.id}</h5>
              {/* <Link to={this.state.selectedPlace.id}>{this.state.selectedPlace.id}</Link> */}
          
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
})(MapContainer);
