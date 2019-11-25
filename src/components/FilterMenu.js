import React, { Component } from 'react'

export default class FilterMenu extends Component {
    render() {
        return (
            <div>
                 <div className="menu">
            <h1>Filter</h1>
            All:{" "}
            <input
              type="radio"
              name="all"
              onClick={this.props.filterFunction}
              onChange={this.eventHandler}
              checked={this.props.selectedOption === 'all'}
            />
            basketball:{" "}
            <input
              type="radio"
              name="basketball"
              onClick={this.props.filterFunction}
              onChange={this.eventHandler}
              checked={this.props.selectedOption === 'basketball'}
            />
            <br />
            soccer:{" "}
            <input
              type="radio"
              name="soccer"
              onClick={this.props.filterFunction}
              onChange={this.eventHandler}
              checked={this.props.selectedOption === 'soccer'}
            />
            <br />
            baseball:{" "}
            <input
              type="radio"
              name="baseball"
              onClick={this.props.filterFunction}
              onChange={this.eventHandler}
              checked={this.props.selectedOption === 'baseball'}
            />
            <br />
            volleyball:{" "}
            <input
              type="radio"
              name="volleyball"
              onClick={this.props.filterFunction}
              onChange={this.eventHandler}
              checked={this.props.selectedOption === 'volleyball'}
            />
          </div>
            </div>
        )
    }
}
