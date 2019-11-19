import React, { Component } from "react";
import "./App.css";
import ListPark from "./components/ListOfParks/ListOfParks";
import SinplePark from "./components/SinglePark/SinglePark";
import Random from "./components/RandomPark/RandomPark";
// import AddNewBeer from "./components/AddNewBeer/AddNewBeer";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import axios from "axios";

class App extends Component {
  state = {
    theParks: null,
    theEvents: null,
    showHeader: true,
    ready: false
  };

  componentDidMount() {
    //Miami Dade Parks and Recs JSON API
    axios
      .get("https://gisweb.miamidade.gov/arcgis/rest/services/Parks/MD_Parks305/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json")
      .then(theResults => {
        let x = theResults.data.features;
        this.setState({
          theParks: x,
          ready: true
        });
      })
      .catch(err => {
        console.log(err);
      });

      // axios
      // .get("https://www.eventbriteapi.com/v3/events/search/?&token=BA6XEE7Q2XYR6CAIRDS6&organizer.id=8231868522&expand=venue")
      // .then(theResults => {
      //   let x = theResults.data;
      //   this.setState({
      //     theEvent: x,
      //     ready: true
      //   });
      // })
      // .catch(err => {
      //   console.log(err);
      // });
  }

  render() { 
    console.log(this.state.theEvent)
    if (this.state.ready) {
      return (
        <div className="App">
          <Switch>
<Header />
            <Route exact path="/" component={Header} />
            <Route
              exact
              path="/listpark/"
              render={props => (
                <ListPark {...props} listOfParks={this.state.theParks} />
              )}
            />
            <Route
              exact
              path="/singlepark/:id"
              render={props => (
                <SinplePark {...props} listOfParks={this.state.theParks} />
              )}
            />
            <Route
              exact
              path="/listevent/"
              render={props => (
                <ListPark {...props} listOfParks={this.state.theEvents} />
              )}
            />
            <Route
              exact
              path="/singleevent/:id"
              render={props => (
                <SinplePark {...props} listOfParks={this.state.theEvents} />
              )}
            />
            <Route
              exact
              path="/randompark/"
              render={props => (
                <Random {...props} listOfParks={this.state.theParks} />
              )}
            />
            {/* <Route exact path="/new/" component={AddNewBeer} /> */}
          </Switch>
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
}

export default App;
