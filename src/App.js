import React, { Component } from "react";
import "./App.css";
import ListPark from "./components/ListOfParks/ListOfParks";
import SinplePark from "./components/SinglePark/SinglePark";
import Random from "./components/RandomPark/RandomPark";
import AddNewEvent from "./components/AddNewEvent/AddNewEvent";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import axios from "axios";
import ironrest from "./components/ironrest"
import eventbrite from 'eventbrite'

 
// // Create configured Eventbrite SDK
// const sdk = eventbrite({token: 'BA6XEE7Q2XYR6CAIRDS6'});
 
// // See: https://www.eventbrite.com/developer/v3/endpoints/users/#ebapi-get-users-id
// sdk.request('https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.within=5mi&location.latitude=25.59338&location.longitude=-80.38397&price=free&start_date.keyword=today&date_modified.keyword=today&search_type=promoted').then(res => {
//     // handle response data
//     console.log(res)
// }).catch(err => console.log(err))


class App extends Component {
  state = {
    theParksFromMiamiDade: null,
    theEventsFromEventful: null,
    thePlacesFromFourSquare: null,
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
          theParksFromMiamiDade: x,
          ready: true
        });
      })
      .catch(err => {
        console.log(err);
      });

      axios.get("https://developers.zomato.com/api/v2.1/categories", {
	"headers": {
    "user-key": "4569b784af3edb69f8ac01194e26cd10",
    // Accept: "application/json"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});

      // axios.get(
      //   'https://www.eventbrite.com/'
      // )
      // // .get("https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.within=5mi&location.latitude=25.59338&location.longitude=-80.38397&price=free&start_date.keyword=today&date_modified.keyword=today&search_type=promoted&token=BA6XEE7Q2XYR6CAIRDS6")
      // .then(theResults => {
      //   let x = theResults.events;
      //   console.log(theResults)
      //   this.setState({
      //     theEventsFromEventful: x,
      //     ready: true
      //   });
      // })
      // .catch(err => {
      //   console.log(err);
      // });


    //   axios
    //   .get('https://api.foursquare.com/v2/venues/explore?client_id=ERXH5IHTI1QJNGSLJQ3GCI2YQLXJQPB102PYT12ZDRHUFXHT&client_secret=Y3NN5QLPV3YN5NBNZTWZDVYJBDMI1NTAHVFPRSCMLMKVMANG&v=20180323&limit=1&ll=40.7243,-74.0018&query=basketball')
    // .then(theResults => {
    //   let x = theResults.data;
    //   this.setState({
    //     thePlacesFromFourSquare: x,
    //     ready: true
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    // });

//     const eventbrite = require('eventbrite');
 
// // Create configured Eventbrite SDK
// const sdk = eventbrite({token: 'BA6XEE7Q2XYR6CAIRDS6'});
 
// // See: https://www.eventbrite.com/developer/v3/endpoints/users/#ebapi-get-users-id
// sdk.request('/users/me').then(res => {
//     // handle response data
// });

  }

  render() { 
    console.log(this.state.thePlacesFromFourSquare)
    if (this.state.ready) {
      return (
        <div className="App">
          <Switch>

            <Route exact path="/" component={Header} />
            <Route
              exact
              path="/listpark/"
              render={props => (
                <ListPark {...props} listOfParks={this.state.theParksFromMiamiDade} />
              )}
            />
            <Route
              exact
              path="/singlepark/:id"
              render={props => (
                <SinplePark {...props} listOfParks={this.state.theParksFromMiamiDade} />
              )}
            />
            <Route
              exact
              path="/listevent/"
              render={props => (
                <ListPark {...props} listOfParks={this.state.theEventsFromEventful} />
              )}
            />
            <Route
              exact
              path="/singleevent/:id"
              render={props => (
                <SinplePark {...props} listOfParks={this.state.theEventsFromEventful} />
              )}
            />
            <Route
              exact
              path="/randompark/"
              render={props => (
                <Random {...props} listOfParks={this.state.theParksFromMiamiDade} />
              )}
            />
            <Route exact path="/new/" component={AddNewEvent} />
            <Route exact path="/ironrest/" component={ironrest} />
          </Switch>
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
}

export default App;
