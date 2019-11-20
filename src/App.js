import React, { Component } from "react";
import "./App.css";
import ListOfPark from "./components/ListOfParks/ListOfParks";
import ListOfEvents from "./components/ListOfEvents/ListOfEvents";
import SinplePark from "./components/SinglePark/SinglePark";
// import Random from "./components/RandomPark/RandomPark";
import AddNewEvent from "./components/AddNewEvent/AddNewEvent";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import axios from "axios";
import SingleEvent from "./components/SingleEvent/SingleEvent";

class App extends Component {
  state = {
    theParksFromMiamiDade: null,
    theEventsFromIronrest: null,
    ready: false,
    message: '',
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
        console.log(x)
        this.setState({
          theEventsFromIronrest: x,
          ready: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  submitNewEvent = (e, name,address,description,sport,date,time,user) => {
    e.preventDefault();

    // let theEventsCopy = {...this.state.theEventsFromIronrest}
    
    const newEvent = { 
        name: name,
        address: address,
        description: description,
        sport: sport,
        date: date,
        time: time,
        user: user
      }
    
      axios.post("https://ironrest.herokuapp.com/avrahm", {event: newEvent})
      .then(res => {
        let eventCopy = [...this.state.theEventsFromIronrest];
        console.log(res)
        eventCopy.push(res.data.ops[0])
        // console.log(event)
      // console.log(res)
      this.setState({
      
        message: "Posted Successfully",
        theEventsFromIronrest: eventCopy,
      }, ()=>
      setTimeout(() => {
        this.setState({
          message: ''
        })
        this.props.history.push('/singleevent/'+res.data.ops[0]._id)
      }, 10000)
      )
    })
    .catch(err => {
      // console.error(err)
      this.setState({
        message: "Error!"
      })
    })
  };

  render() {
    {console.log(this.props)}
    if (this.state.ready) {
      return (
        <div className="App">
          <Header />
          <Switch>
            {/* <Route exact path="/" component={Header} /> */}
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
            <Route exact path="/singleevent/:id" render={props => (
                <SingleEvent
                  {...props}
                  listOfEvents={this.state.theEventsFromIronrest}
                  ready={this.state.ready}
                  message={this.state.message}
                />
              )}/>
            <Route exact path="/new/" render={props => (
                <AddNewEvent
                  {...props}
                  // listOfEvents={this.state.theEventsFromIronrest}
                  message={this.state.message}
                  submitEventFunction={this.submitNewEvent} 
                />
              )} />
          </Switch>
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
}

export default App;
