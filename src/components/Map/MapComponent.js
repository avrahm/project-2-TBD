import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import InfoWindowEx from "./InfoWindowEx";
import { myHistory } from "../../index.js";


class MapComponent extends Component {
    state = {
        center: {
          lat: this.props.lat,
          lng: this.props.lon
        },
        zoom: 15,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      };

      showDetails = () => {
        myHistory.push(this.state.selectedPlaceLink + this.state.selectedPlaceId);
      };

      
    render() {
        const style = {
            width: '100%',
            height: '200px'
          }
        return (
            <div>
                <Map
                  google={this.props.google}
                  style={style}
                  zoom={this.state.zoom}
                  initialCenter={this.state.center}
                >
                  <Marker
                    onClick={this.onMarkerClick}
                    key={this.props.id}
                    id={this.props.type}
                    place_={this.props.details}
                    // icon={{ url: this.props.img }}
                    position={{
                      lat: this.props.lat,
                      lng: this.props.lon
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
                        onClick={this.showDetails.bind(
                          this,
                          this.state.selectedPlace
                        )}
                      >
                        Show details
                      </button>
                    </div>
                  </InfoWindowEx>
                </Map>
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyDZiBSkaZztK2mN3Q8QzvzcfPCsDX2_p58"
  })(MapComponent);