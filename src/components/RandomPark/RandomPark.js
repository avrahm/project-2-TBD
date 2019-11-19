import React from "react";
import SinglePark from "../SinglePark/SinglePark"
import Header from "../Header/Header"

function Random(props) {
  let randomNumber = Math.floor(Math.random() * props.listOfParks.length);

  let thePark = props.listOfParks[randomNumber];

  // console.log(thePark)
  return (
    <div>
    <Header />
      <SinglePark randomPark={thePark.attributes.ID} listOfParks={props.listOfParks} />
    </div>
  );
}
export default Random;
