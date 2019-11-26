import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBaseballBall,
  faBasketballBall,
  faVolleyballBall,
  faFutbol,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

export default class FilterMenu extends Component {

  state = {
    searchMenuToggle: true
  };
  searchMenu = () => {
    this.setState({
      searchMenuToggle: false
    });

  }
  render() {

    return (
      <div >
      <button className="menu-button" onClick={this.searchMenu}>
            <FontAwesomeIcon icon={faSearch} className="menu-icon" />
            <br /> Search
          </button>
        <div className={this.state.searchMenuToggle ? "filter-menu" : "filter-menu hide"}>
          
          All:{" "}
          <input
            type="radio"
            name="all"
            onClick={this.props.filterFunction}
            onChange={this.eventHandler}
            checked={this.props.selectedOption === "all"}
          />
          Basketball:{" "}
          <input
            type="radio"
            name="basketball"
            onClick={this.props.filterFunction}
            onChange={this.eventHandler}
            checked={this.props.selectedOption === "basketball"}
          />
          <br />
          Soccer:{" "}
          <input
            type="radio"
            name="soccer"
            onClick={this.props.filterFunction}
            onChange={this.eventHandler}
            checked={this.props.selectedOption === "soccer"}
          />
          <br />
          Baseball:{" "}
          <input
            type="radio"
            name="baseball"
            onClick={this.props.filterFunction}
            onChange={this.eventHandler}
            checked={this.props.selectedOption === "baseball"}
          />
          <br />
          Volleyball:{" "}
          <input
            type="radio"
            name="volleyball"
            onClick={this.props.filterFunction}
            onChange={this.eventHandler}
            checked={this.props.selectedOption === "volleyball"}
          />
        </div>
      </div>
    );
  }
}
