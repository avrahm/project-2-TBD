import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Header from "../Header/Header";
import Loading from "./Loading/loading"

export default class List extends Component {
  showParks = () => {
    return this.props.listOfParks.map((eachPark, i) => {
      // console.log(eachPark.attributes.ID)
      return (
        <div className="container d-flex flex-row" key={i}>
          {/* <div className="col-4">
            <img src={eachPark.fac} alt={eachPark.name} height="100px" />
          </div> */}
          <div className="col-8">
            <Link to={"/singlepark/" + eachPark.attributes.ID}>
              <h4 className="name">{eachPark.attributes.NAME}</h4>
            </Link>
            Address: {eachPark.attributes.ADDRESS}
            <p className="contributor">Phone: {eachPark.attributes.PHONE}</p>
          </div>
        </div>
      );
    });
  };
  render() {
    // console.log(this.props.listOfParks)
    if (this.props.listOfParks)
      return (
        <div>
          {/* <Header /> */}
          <h1>List of Parks</h1>
          {this.showParks()}
        </div>
      );
    else return <Loading />;
  }
}
