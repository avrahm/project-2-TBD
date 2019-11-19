import React from "react";
import SinglePark from "../SinglePark/SinglePark"

function Random(props) {
  let randomNumber = Math.floor(Math.random() * props.listOfParks.length);

  let thePark = props.listOfParks[randomNumber];

  // console.log(thePark)
  return (
    <div>
      <SinglePark randomPark={thePark.attributes.ID} listOfParks={props.listOfParks} />
    </div>
  );
}
export default Random;
