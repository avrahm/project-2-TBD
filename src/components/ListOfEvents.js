import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Header from "../Header/Header";
import Axios from "axios";
import { myHistory } from "../index";
//import images
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../images", false, /\.(png|jpe?g|svg)$/)
);

export default class ListOfEvents extends Component {
  deleteEvent = e => {
    let deleteId = e.target.name;
    Axios.delete("https://ironrest.herokuapp.com/avrahm/" + deleteId)
      .then(res => {
        console.log("deleted");

        myHistory.push("/listevent/");
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(e.target.name)
  };
  showEvents = () => {
    // console.log(this.props.listOfEvents.event.name)
    return this.props.listOfEvents.map((eachEvent, i) => {
      // console.log(eachEvent)

      return (
        <div className="container d-flex flex-row" key={i}>
          {" "}
          <Link to={"/singleevent/" + eachEvent._id}>
            <div className="col-4">
              <img
                src={images[eachEvent.event.img]}
                alt={eachEvent.event.name}
                height="100px"
              />
            </div>
          </Link>
          <div className="col-8">
            <Link to={"/singleevent/" + eachEvent._id}>
              <h4 className="title">{eachEvent.event.title}</h4>
              <h4 className="location-name">{eachEvent.event.location.name}</h4>
            </Link>
            <button name={eachEvent._id} id={i} onClick={this.deleteEvent}>
              delete
            </button>

            {/* Date: {eachEvent[i].date} */}
            {/* <p className="contributor">Phone: {eachEvent.PHONE}</p> */}
          </div>
        </div>
      );
    });
  };

  render() {
    // console.log(this.props.listOfEvents)
    // console.log(this.props.listOfEvents)
    if (this.props.listOfEvents)
      return (
        <div>
          {/* <Header /> */}

          <h1>List of Events</h1>
          <div className="menu">
            <h1>Filter</h1>
            basketball:{" "}
            <input
              type="checkbox"
              name="basketball"
              onClick={this.props.filterEventsFunction}
              // onClick={this.eventHandler}
            />
            <br />
            soccer:{" "}
            <input
              type="checkbox"
              name="soccer"
              onClick={this.props.filterEventsFunction}
              // onClick={this.eventHandler}
            />
            <br />
            yoga:{" "}
            <input
              type="checkbox"
              name="yoga"
              onClick={this.props.filterEventsFunction}
              // onClick={this.eventHandler}
            />
          </div>
          {this.showEvents()}
        </div>
      );
    else return <div>Loading...</div>;
  }
}
