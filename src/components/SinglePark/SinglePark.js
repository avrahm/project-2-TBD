import React from "react";
// import Header from "../Header/Header";

class Single extends React.Component {
  render() {
    if (this.props.listOfParks) {
      // console.log(this.props.listOfParks)

      let thePark = this.props.listOfParks.find(park => {
        return park.attributes.ID === this.props.match.params.id;
      });
      return (
        <div>
          {/* <Header /> */}
          <div className="container d-flex flex-column">
            <div>
              {/* <img src={thePark.attributes.iD} alt={thePark.name} width="100px" /> */}
            </div>
            <div>
              <h1>{thePark.attributes.NAME}</h1>
              <h3 className="tagline">Address: {thePark.attributes.ADDRESS}</h3>
              <p>Phone: {thePark.attributes.PHONE}</p>
              <p>Latitude: {thePark.attributes.LAT}</p>
              <p>Longitude: {thePark.attributes.LON}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
}
export default Single;
