import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ParkCard extends Component {
    render() {
        return ( 
        <div className="container d-flex flex-row" key={this.props.i}>
        {/* <div className="col-4">
          <img src={this.props.eachPark.fac} alt={this.props.eachPark.name} height="100px" />
        </div> */}
        <div className="col-8">
          <Link to={"/singlepark/" + this.props.eachPark.attributes.ID}>
            <h4 className="name">{this.props.eachPark.attributes.NAME}</h4>
          </Link>
          Address: {this.props.eachPark.attributes.ADDRESS}
          <p className="contributor">Phone: {this.props.eachPark.attributes.PHONE}</p>
          {/* Distance away: {this.props.distanceFunction(this.props.userLocation.latitude,this.props.userLocation.longitude,this.props.eachPark.attributes.LAT,this.props.eachPark.attributes.LON,"N")} */}
        </div>
      </div>
        )
    }
}
