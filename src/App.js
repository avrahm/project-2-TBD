import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { myHistory } from "./index.js";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import Header from "./components/Header/Header";
import SignIn from "./components/SignIn";
import Loading from "./components/Loading/Loading.js";
import ListOfParks from "./components/ListOfParks";
import ListOfEvents from "./components/ListOfEvents";
import SinglePark from "./components/SinglePark";
// import Random from "./components/RandomPark/RandomPark";
import AddNewEvent from "./components/AddNewEvent";
import SingleEvent from "./components/SingleEvent";
import SearchMap from "./components/MapEventsOld";

// testing files
// import FilterTesting from "./components/testing/filtertesting";

class App extends Component {
  state = {
    theParksFromMiamiDade: null,
    theEventsFromIronrest: null,
    ready: false,
    message: "",
    sports: ["Soccer", "Basketball", "Volleyball", "Baseball"],
    eventTitleOptions: ["Pick-Up", "League",  "Practice", "Try-Outs"],
    filteredEvents: [],
    filteredParks: [], 
    userLocation: {
      latitude: 0,
      longitude: 0
    },
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

    let geo_success = position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    };

    let geo_error = () => {
      console.log("Sorry, no position available.");
    };

    let geo_options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 7000
    };

    navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
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
    let imgGen = sport.toLowerCase() + Math.floor(Math.random() * 3) + ".jpg";
    let titleGen = sport +" "+ this.state.eventTitleOptions[Math.floor(Math.random() * 3) ]
    const newEvent = {
      title: titleGen,
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

  submitParkUpdateFunction = (
    e,
    location,
    sport,
    phone,
    user
  ) => {
    e.preventDefault();

    // let theEventsCopy = {...this.state.theEventsFromIronrest}
    const parkUpdate = {
      location: location,
      sport: sport,
      phone: phone,
      user: user
    };

    axios
      .post("https://ironrest.herokuapp.com/avrahm", { event: parkUpdate })
      .then(res => {
        // let eventCopy = [...this.state.theEventsFromIronrest];
        // console.log(res)
        // eventCopy.push(res.data.ops[0]);
        // console.log(event)
        // console.log(res)
        this.setState(
          {
            message: "Posted Successfully",
            // theEventsFromIronrest: eventCopy
          },
          // () =>
          //   setTimeout(() => {
          //     this.setState({
          //       message: ""
          //     });
          //     // myHistory.push("/singleevent/" + res.data.ops[0]._id);
          //   }, 1000)
        );
      })
      .catch(err => {
        // console.error(err)
        this.setState({
          message: "Error!"
        });
      });
  };

  distanceFunction = (lat1, lon1, lat2, lon2, unit)=>{
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit==="K") { dist = dist * 1.609344 }
      if (unit==="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

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
        res => res.event.sport.toLowerCase() === e.target.id
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
    if (this.state.ready) {
      return (
        <div className="App">
          <SignIn />
          <Header />
          <Switch>
            {/* testing */}
            <Route
              exact
              path="/searchmap/"
              render={props => (
                <SearchMap
                  {...props}
                  parkData={this.state.filteredParks}
                  eventData={this.state.filteredEvents}
                  filterFunction={this.filterFunction}
                  center={{ lat: 25.7617, lng: -80.1918 }}
                  selectedOption={this.state.selectedOption}
                  ready={this.state.ready}
                  userLocation={this.state.userLocation}
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
                  userLocation={this.state.userLocation}
                  distanceFunction={this.distanceFunction}
                  submitParkUpdateFunction={this.submitParkUpdateFunction}
                  message={this.state.message}
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
                  userLocation={this.state.userLocation}
                  distanceFunction={this.distanceFunction}
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
                  eventTitleOptions={this.state.eventTitleOptions}
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
