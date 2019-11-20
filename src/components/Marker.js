import React, { Component } from 'react';
import MapMarker from '../images/park-map.png'

export default class Marker extends Component {
    render() {
        return (
            <div>
                <img src={MapMarker} alt={this.props.text} />
            </div>
        )
    }
}
