import React, { Component } from "react";

export default class filtertesting extends Component {
  state = {
    events: this.props.listOfEvents,
    sportFilter: ""
  };

  eventHandler = e => {
    let eventsFilter;
    //if target checked is true then filter events by sport with the target name (ie. basketball, soccer, etc)
    if(e.target.checked===true){
      eventsFilter = this.state.events.filter(
        res => res.event.sport === e.target.name
        );
      this.setState({ events: eventsFilter });
      // console.log(eventsFilter)
      } else {
        
      this.setState({ events: this.props.listOfEvents });
      }
  };

  showEvents = () => {
    return this.state.events.map((res, i) => {
      return <li key={i}>{res.event.sport}</li>;
    });
  };
  render() {
    if (this.props.listOfParks && this.props.listOfEvents)
      return (
        <div>
          <h1>Filter Testing</h1>
          basketball:{" "}
          <input
            type="checkbox"
            name="basketball"
            // onClick={this.props.filterParksFunction}
            onClick={this.eventHandler}
          />
          <br />
          soccer:{" "}
          <input
            type="checkbox"
            name="soccer"
            // onClick={this.props.filterParksFunction}
            onClick={this.eventHandler}
          />
          <br />
          yoga:{" "}
          <input
            type="checkbox"
            name="yoga"
            // onClick={this.props.filterParksFunction}
            onClick={this.eventHandler}
          />
          <br />
          <ul>{this.showEvents()}</ul>
        </div>
      );
    else return <h1>Loading....</h1>;
  }
}
