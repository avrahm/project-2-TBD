import React from "react";
import HomeHeader from "../HomeHeader/HomeHeader";

function Single(props) {
  // console.log(props.listOfParks)
  let randomPark = props.randomPark;
  let thePark;
  if (randomPark) {
    thePark = props.listOfParks.find(park => {
      return park.attributes.ID === randomPark;
    });
  } else {
    thePark = props.listOfParks.find(park => {
      return park.attributes.ID === props.match.params.id;
    });
  }

  return (
    <div>
      <HomeHeader />
      <div className="container d-flex flex-column">
        <div>
          {/* <img src={thePark.attributes.iD} alt={thePark.name} width="100px" /> */}
        </div>
        <div>
          <h1>{thePark.attributes.NAME}</h1>
          <h3 className="tagline">Address: {thePark.attributes.ADDRESS}</h3>
          <p>Phone: {thePark.attributes.PHONE}</p>
        </div>
      </div>
    </div>
  );
}
export default Single;
