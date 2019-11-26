import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faBaseballBall,
  // faBasketballBall,
  // faVolleyballBall,
  // faFutbol,
  // faSearch,
  faFilter
} from "@fortawesome/free-solid-svg-icons";

export default class FilterMenu extends Component {
  state = {
    activeLink: ""
  };
  searchMenu = e => {
    this.setState({});
  };
  render() {
    return (
      <div className="filter-menu filter-label-selector">
        <label>
          <FontAwesomeIcon
            icon={faFilter}
            className="filter-menu-icon filter-label"
          />
        </label>
        <label
          className={
            this.props.selectedOption === "all"
              ? "filter-label active"
              : "filter-label"
          }
          htmlFor="all"
        >
          All
        </label>
        <input
          type="radio"
          id="all"
          name="filter-sport"
          onClick={this.props.filterFunction}
          onChange={this.eventHandler}
          defaultChecked={this.props.selectedOption === "all"}
        />

        <label
          className={
            this.props.selectedOption === "basketball"
              ? "filter-label active"
              : "filter-label"
          }
          htmlFor="basketball"
        >
          Basketball
        </label>
        <input
          type="radio"
          id="basketball"
          name="filter-sport"
          onClick={this.props.filterFunction}
          onChange={this.eventHandler}
          defaultChecked={this.props.selectedOption === "basketball"}
        />
        <br />

        <label
          className={
            this.props.selectedOption === "soccer"
              ? "filter-label active"
              : "filter-label"
          }
          htmlFor="soccer"
        >
          Soccer
        </label>
        <input
          type="radio"
          id="soccer"
          name="filter-sport"
          onClick={this.props.filterFunction}
          onChange={this.eventHandler}
          defaultChecked={this.props.selectedOption === "soccer"}
        />
        <br />
        <label
          className={
            this.props.selectedOption === "baseball"
              ? "filter-label active"
              : "filter-label"
          }
          htmlFor="baseball"
        >
          Baseball
        </label>

        <input
          type="radio"
          id="baseball"
          name="filter-sport"
          onClick={this.props.filterFunction}
          onChange={this.eventHandler}
          defaultChecked={this.props.selectedOption === "baseball"}
        />
        <br />
        <label
          className={
            this.props.selectedOption === "volleyball"
              ? "filter-label active"
              : "filter-label"
          }
          htmlFor="volleyball"
        >
          Volleyball
        </label>

        <input
          type="radio"
          id="volleyball"
          name="filter-sport"
          onClick={this.props.filterFunction}
          onChange={this.eventHandler}
          defaultChecked={this.props.selectedOption === "volleyball"}
        />
      </div>
      // </div>
    );
  }
}
