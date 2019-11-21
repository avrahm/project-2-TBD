import React, { Component } from "react";
import "./App.css";
import ListOfPark from "./components/ListOfParks";
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
import UserLocaiton from "./components/UserLocation";
import Loading from "./components/Loading/loading";

// testing files
import FilterTesting from "./components/testing/filtertesting";

class App extends Component {
  state = {
    theParksFromMiamiDade: null,
    theEventsFromIronrest: null,
    ready: false,
    message: "",
    sports: ["soccer", "basketball", "yoga"],
    filteredParks: "",
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

  filterParksBySport = e => {
    // console.log(e.target.name + ' : '  + e.target.checked)

    // let queryFiltersCopy = { ...this.state.queryFilters };
    // console.log(queryFiltersCopy);
    let check = e.target.checked;
    let sport = e.target.name;
    this.setState(
      {
        [sport]: check
      },
      () => {
        console.log(this.state.basketball);
        console.log(this.state.soccer);
        console.log(this.state.yoga);
      }
    );

    // let check = e.target.checked;
    // let sport = e.target.name;
    // let query = [...this.state.queryFilters];
    // query.unshift(sport+':'+check)
    // this.setState({queryFilters: query})
    // console.log(this.state.queryFilters)
    // // let dataCopy = [...this.state.data]
    // let filterParks = this.state.theParksFromMiamiDade.filter(filters => {
    //   return filters.stocked === e.target.checked ? outStock.stocked === false : outStock
    // })

    // // return console.log(outStockProduct)
    //  this.setState({
    //   filteredParks:outStockProduct
    //   })
  };

  render() {
    // {console.log(myHistory)}
    if (this.state.ready) {
      return (
        <div className="App">
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
                  listOfEvents={this.state.theEventsFromIronrest}
                  ready={this.state.ready}
                  filterParksFunction={this.filterParksBySport}
                />
              )}
            />

            {/* end testing */}
            <Route exact path="/userlocation/" component={UserLocaiton} />
            <Route
              exact
              path="/listpark/"
              render={props => (
                <ListOfPark
                  {...props}
                  listOfParks={this.state.theParksFromMiamiDade}
                  ready={this.state.ready}
                />
              )}
            />
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
              path="/listevent/"
              render={props => (
                <ListOfEvents
                  {...props}
                  listOfEvents={this.state.theEventsFromIronrest}
                  ready={this.state.ready}
                />
              )}
            />
            <Route
              exact
              path="/map/"
              // component={Map}
              render={props => (
                <Map
                  {...props}
                  listOfParks={this.state.theParksFromMiamiDade}
                  filterParksFunction={this.filterParksBySport}
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
