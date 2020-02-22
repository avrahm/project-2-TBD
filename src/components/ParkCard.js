import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketballBall,
  faVolleyballBall,
  faFutbol,
  faBaseballBall
} from "@fortawesome/free-solid-svg-icons";
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../images/parks", false, /\.(png|jpe?g|svg)$/)
);
export default class ParkCard extends Component {

  render() {
    let listOfSports = [];
    if (this.props.eachPark.attributes.BASKETBALL === "Yes") {
      listOfSports.push(<FontAwesomeIcon icon={faBasketballBall} key={1}/>);
    }
    if (this.props.eachPark.attributes.VOLLEYBALL === "Yes") {
      listOfSports.push(<FontAwesomeIcon icon={faVolleyballBall} key={2}/>);
    }
    if (this.props.eachPark.attributes.BASEBALL === "Yes") {
      listOfSports.push(<FontAwesomeIcon icon={faBaseballBall} key={3}/>);
    }
    if (this.props.eachPark.attributes.SOCCER === "Yes") {
      listOfSports.push(<FontAwesomeIcon icon={faFutbol} key={4}/>);
    }
    let parkImg = "park" + [Math.floor(Math.random()*11)] + ".jpg";

    return (
      <div className="event-card col-12 col-md-5" >
      
        <div className="event-card-heading" style={{
              backgroundImage:
                "url(" + images[parkImg] + ")"
            }}>
        </div>
        <div className="col-8">
          <Link to={"/singlepark/" + this.props.eachPark.attributes.ID}>
            <h4 className="name">{this.props.eachPark.attributes.NAME}</h4>
          </Link>
          <h4>{listOfSports}</h4>
          Address: {this.props.eachPark.attributes.ADDRESS}
          <p className="contributor">
            Phone: {this.props.eachPark.attributes.PHONE}
          </p>
          <p>{Math.floor(this.props.distance)} miles away</p>
        </div>
      </div>
    );
  }
}
