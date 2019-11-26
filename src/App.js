import React, { Component } from "react";
import "./App.css";
import ListOfParks from "./components/ListOfParks";
import ListOfEvents from "./components/ListOfEvents";
import SinglePark from "./components/SinglePark";
// import Random from "./components/RandomPark/RandomPark";
import AddNewEvent from "./components/AddNewEvent";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import axios from "axios";
import SingleEvent from "./components/SingleEvent";
import { myHistory } from "./index.js";
import Loading from "./components/Loading/loading";
import SignIn from "./components/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";

// testing files
// import FilterTesting from "./components/testing/filtertesting";
import MapEventsOld from "./components/MapEventsOld";

class App extends Component {
  state = {
    theParksFromMiamiDade: null,
    theEventsFromIronrest: null,
    ready: false,
    message: "",
    sports: ["soccer", "basketball", "volleyball", "baseball"],
    filteredEvents: [],
    filteredParks: [],
    basketball: true,
    soccer: false,
    yoga: false,
    selectedOption: "all",
    eventDescriptionLorem: ["Foul line 4-bagger slide hardball outfielder, rally left on base field. Fair right field 1-2-3 dead red bag passed ball double play. At-bat bleeder warning track starter wins cycle arm reds around the horn. Bunt shift shutout off-speed second base left on base rip sacrifice. Gap robbed outside range right fielder hey batter national pastime wins. Fair first base bunt chin music pine tar hot dog dead ball era astroturf lineup.",
    "Leadoff airmail team at-bat bunt at-bat field fan. Second baseman earned run sacrifice fly squeeze third base loss second base. World series cup of coffee stadium field 1-2-3, out fastball. Rally ground ball stretch rake sweep stretch left fielder gapper rally. No-hitter sacrifice bunt bag fall classic league second base rip. Cycle rally dodgers friendly confines take butcher boy sacrifice fly.",
    "Bleeder full count series first baseman contact ground ball outfield. Take astroturf third base cellar fielder's choice line drive can of corn in the hole. Bunt helmet series ground ball peanuts count base on balls. Starter count extra innings choke up left field petey pine tar. Robbed count good eye losses pinch hitter, sabremetrics error. Basehit mound extra innings warning track baseball pitchout rookie blue bush league.",
    "Cardinals doubleheader nubber sacrifice bunt mitt silver slugger national pastime left fielder mendoza line. No decision assist left field outfield around the horn, 4-bagger swing walk off dodgers. Fair rhubarb run batted in second baseman starting pitcher gapper catcher. Astroturf stretch left field helmet loogy no decision force. Rotation baltimore chop butcher boy suicide squeeze third base slugging bases loaded strikeout play. Strikeout world series baltimore chop robbed second base left fielder line drive.",
    "Ejection balk bench game grounder ground ball gapper. Forkball grand slam cheese pennant leather tigers bag balk airmail. 1-2-3 range run loogy steal bat wild pitch bench cellar. Grass backstop sport shift second baseman plate foul mendoza line. Full count cork game good eye chin music, team field rally season. League rubber cup of coffee passed ball unearned run outfielder slide warning track."]
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
          filteredParks: x,
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

    // axios
    //   .get("http://skateipsum.com/get/1/0/JSON")
    //   .then(res => {
    //     let x = res;
        
    //     this.setState({
    //       eventDescriptionLorem: x
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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

  filterFunction = e => {
    let parksFiltered;
    let eventsFiltered;
    let sportButton = e.target.id.toUpperCase();
    // console.log(sportButton)
    //if target checked is true then filter parks by sport with the target name (ie. basketball, soccer, etc)
    if (e.target.id === "all") {
      this.setState({
        filteredParks: this.state.theParksFromMiamiDade,
        filteredEvents: this.state.theEventsFromIronrest,
        selectedOption: e.target.id
      });
    } else if (e.target.checked === true) {
      parksFiltered = this.state.theParksFromMiamiDade.filter(
        res => res.attributes[sportButton] === "Yes"
      );
      eventsFiltered = this.state.theEventsFromIronrest.filter(
        res => res.event.sport === e.target.id
      );
      this.setState({
        filteredParks: parksFiltered,
        filteredEvents: eventsFiltered,
        selectedOption: e.target.id
      });
      // console.log(this.state.parks)
    } else {
      this.setState({
        filteredParks: this.state.theParksFromMiamiDade,
        filteredEvents: this.state.theEventsFromIronrest,
        selectedOption: "all"
      });
    }
  };

  render() {
    // {console.log(myHistory)}
    // console.log(this.state.eventDescriptionLorem);
    if (this.state.ready) {
      return (
        <div className="App">
          <SignIn />
          <Header />
          <Switch>
            {/* testing */}
            <Route
              exact
              path="/maptesting/"
              render={props => (
                <MapEventsOld
                  {...props}
                  parkData={this.state.filteredParks}
                  eventData={this.state.filteredEvents}
                  filterFunction={this.filterFunction}
                  center={{ lat: 25.7617, lng: -80.1918 }}
                  selectedOption={this.state.selectedOption}
                />
              )}
            />

            {/* end testing */}

            <Route
              exact
              path="/singlepark/:id"
              render={props => (
                <SinglePark
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
                  filterFunction={this.filterFunction}
                  selectedOption={this.state.selectedOption}
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
                  filterFunction={this.filterFunction}
                  selectedOption={this.state.selectedOption}
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
                  descriptionLorem={this.state.eventDescriptionLorem}
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