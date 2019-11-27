import React, { Component } from "react";
import Loading from "./Loading/Loading";
import FilterMenu from './FilterMenu'
import ParkCard from "./ParkCard";


export default class ListOfParks extends Component {


  showParks = () => {
    return this.props.listOfParks.map((eachPark, i) => {
      return (
       <ParkCard eachPark={eachPark} i={i} userLocation={this.props.userLocation} distanceFunction={this.props.distanceFunction} />
       );
    });
  };


  render() {
    if (this.props.listOfParks)
      return (
        <div>
         <FilterMenu selectedOption={this.props.selectedOption} filterFunction={this.props.filterFunction} />
          <h1>List of Parks</h1>
          {this.showParks()}
        </div>
      );
    else return <Loading />;
  }
}
