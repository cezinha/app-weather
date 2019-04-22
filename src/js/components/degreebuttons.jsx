import React, { Component } from 'react';
import './degreebuttons.scss';

class DegreeButtons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            units: props.units
        };
    }

    render() {
        let handleClick = (e) => {
            e.preventDefault();

            let params = new URLSearchParams(location.search);
            let changeToUnits = (this.state.units == "si") ? "us" : "si";

            if (params.has("units")) {
                params.set("units", changeToUnits);
            } else {
                params.append("units", changeToUnits);
            }
            location.search = (params.toString());
        };

        if (this.state.units == "si") {
            return (
                <div id="degree-buttons">
                    <a href="/" className="degree disabled" id="degree-c"><i className="wi wi-celsius"></i></a>
                    <a href="/" className="degree off" id="degree-f" onClick={handleClick}><i className="wi wi-fahrenheit"></i></a>
                </div>
            );
        }

        return (
            <div id="degree-buttons">
                <a href="/" className="degree off" id="degree-c" onClick={handleClick}><i className="wi wi-celsius"></i></a>
                <a href="/" className="degree disabled" id="degree-f"><i className="wi wi-fahrenheit"></i></a>
            </div>
        );
    }
}

export default DegreeButtons;