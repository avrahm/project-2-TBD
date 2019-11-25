import React, { Component } from "react";

export default class FilterMenu extends Component {
  render() {
    return (
      <div>
        <div className="filter-menu">
          <h3>Filter</h3>
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
