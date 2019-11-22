import React, { Component } from "react";
import "./App.css";
import ListOfParks from "./components/ListOfParks";
import ListOfEvents from "./components/ListOfEvents";
import SinplePark from "./components/SinglePark";
// import Random from "./components/RandomPark/RandomPark";
import AddNewEvent from "./components/AddNewEvent";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import axios from "axios";
import SingleEvent from "./components/SingleEvent";
import { myHistory } from "./index.js";
import Map from "./components/Map.js";
// import UserLocaiton from "./components/UserLocation";
import Loading from "./components/Loading/loading";
import SignIn from "./components/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";

// testing files
import FilterTesting from "./components/testing/filtertesting";

class App extends Component {
  state = {
    theParksFromMiamiDade: null,
    theEventsFromIronrest: null,
    ready: false,
    message: "",
    sports: ["soccer", "basketball", "yoga"],
    filteredEvents: [],
    filteredParks: [],
    basketball: true,
    soccer: false,
    yoga: false
  };

  componentDidMount() {
    //Miami Dade Parks and Recs JSON API
    axios
      .get(
        "https://gisweb.miamidade.gov/arcgis/rest/services/Parks/MD_Parks305/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
      )
      .then(theResults => {
        let x = theResults.data.features;
        this.setState({
          theParksFromMiamiDade: x,
          ready: true
        });
      })
      .catch(err => {
        console.log(err);
      });

    //Events from IronRest
    axios
      .get("https://ironrest.herokuapp.com/avrahm")
      .then(res => {
        let x = res.data;
        // console.log(x)
        this.setState({
          theEventsFromIronrest: x,
          filteredEvents: x,
          ready: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  submitNewEvent = (
    e,
    title,
    location,
    description,
    sport,
    date,
    time,
    user
  ) => {
    e.preventDefault();

    // let theEventsCopy = {...this.state.theEventsFromIronrest}
    let imgGen = sport + Math.floor(Math.random() * 2) + ".jpg";
    const newEvent = {
      title: title,
      location: location,
      description: description,
      sport: sport,
      img: imgGen,
      date: date,
      time: time,
      user: user
    };

    axios
      .post("https://ironrest.herokuapp.com/avrahm", { event: newEvent })
      .then(res => {
        let eventCopy = [...this.state.theEventsFromIronrest];
        // console.log(res)
        eventCopy.push(res.data.ops[0]);
        // console.log(event)
        // console.log(res)
        this.setState(
          {
            message: "Posted Successfully",
            theEventsFromIronrest: eventCopy
          },
          () =>
            setTimeout(() => {
              this.setState({
                message: ""
              });
              myHistory.push("/singleevent/" + res.data.ops[0]._id);
            }, 1000)
        );
      })
      .catch(err => {
        // console.error(err)
        this.setState({
          message: "Error!"
        });
      });
  };

  filterEventsFunction = e => {
    // console.log(e.target.name)
    let eventsFiltered;
    //if target checked is true then filter events by sport with the target name (ie. basketball, soccer, etc)
    if (e.target.checked === true) {
      eventsFiltered = this.state.theEventsFromIronrest.filter(
        res => res.event.sport === e.target.name
      );
      this.setState({ filteredEvents: eventsFiltered });
      // console.log(eventsFilter)
    } else {
      this.setState({ filteredEvents: this.state.theEventsFromIronrest });
    }
  };

  parkFilterFunction = e => {
    let parksFiltered;
    let sportButton = e.target.name.toUpperCase();
    // console.log(sportButton)
    //if target checked is true then filter parks by sport with the target name (ie. basketball, soccer, etc)
    if (e.target.checked === true) {
      parksFiltered = this.state.theParksFromMiamiDade.filter(
        res => res.attributes[sportButton] === "Yes"
      );
      this.setState({ filteredParks: parksFiltered });
      // console.log(this.state.parks)
    } else {
      this.setState({ filteredParks: this.state.theParksFromMiamiDade });
    }
  };

  render() {
    // {console.log(myHistory)}
    if (this.state.ready) {
      return (
        <div className="App">
          <SignIn />
          <Header />
          <Switch>
            {/* testing */}
            <Route
              exact
              path="/testing/"
              render={props => (
                <FilterTesting
                  {...props}
                  listOfParks={this.state.theParksFromMiamiDade}
                  listOfEvents={this.state.filteredEvents}
                  ready={this.state.ready}
                  filterEventsFunction={this.filterEventsFunction}
                />
              )}
            />

            {/* end testing */}
           
            <Route
              exact
              path="/singlepark/:id"
              render={props => (
                <SinplePark
                  {...props}
                  listOfParks={this.state.theParksFromMiamiDade}
                  listOfEvents={this.state.theEventsFromIronrest}
                  ready={this.state.ready}
                />
              )}
            />
            <Route
              exact
              path="/listpark/"
              render={props => (
                <ListOfParks
                  {...props}
                  listOfParks={this.state.filteredParks}
                  ready={this.state.ready}
                  parkFilterFunction={this.parkFilterFunction}
                />
              )}
            />
            <Route
              exact
              path="/listevent/"
              render={props => (
                <ListOfEvents
                  {...props}
                  listOfEvents={this.state.filteredEvents}
                  ready={this.state.ready}
                  filterEventsFunction={this.filterEventsFunction}
                />
              )}
            />
            <Route
              exact
              path="/map/"
              render={props => (
                <Map
                  {...props}
                  listOfParks={this.state.filteredParks}
                  parkFilterFunction={this.parkFilterFunction}
                />
              )}
            />
            <Route
              exact
              path="/singleevent/:id"
              render={props => (
                <SingleEvent
                  {...props}
                  listOfEvents={this.state.theEventsFromIronrest}
                  ready={this.state.ready}
                  message={this.state.message}
                />
              )}
            />
            <Route
              exact
              path="/new/"
              render={props => (
                <AddNewEvent
                  {...props}
                  listOfParks={this.state.theParksFromMiamiDade}
                  message={this.state.message}
                  submitEventFunction={this.submitNewEvent}
                  sports={this.state.sports}
                />
              )}
            />
          </Switch>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default App;
