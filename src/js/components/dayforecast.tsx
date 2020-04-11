import React, { Component } from 'react';
import './dayforecast.scss';
import { convertIcon } from '../util';

function getData(data) {
    var o = {};

    o.tempMax = Math.ceil(Number(data.daily.data[0].temperatureMax));
    o.tempMin = Math.ceil(Number(data.daily.data[0].temperatureMin));
    o.currTemp = Math.ceil(Number(data.currently.temperature));
    o.dewPoint = Math.ceil(Number(data.currently.dewPoint));
    o.windSpeed = Math.ceil(Number(data.currently.windSpeed));
    o.humidity = Math.ceil(Number(data.currently.humidity) * 100);
    o.summary = data.daily.data[0].summary;
    o.iconClass =  'wi ' + convertIcon(data.currently.icon);
    o.windSpeedUnit = ' m/s';

    if (data.flags.units == "us") {
        o.windSpeedUnit = ' mph';
    }

    return o;
}

class DayForecast extends Component {
	public props: any;

    render() {
        let data = {
            tempMax: '',
            tempMin: '',
            currTemp: '',
            dewPoint: '',
            windSpeed: '',
            humidity: '',
            windSpeedUnit: '',
            summary: '',
            iconClass: ''
        };

        if (this.props.data) {
            data = getData(this.props.data);
        }

        return (
            <div id="day-forecast">
                <div id="weather" className="container">
                    <div id="min-max" className="detail">
                        <div id="max">
                            {data.tempMax}°
                            <span className="arrow-up"></span>
                        </div>
                        <div id="min">
                            {data.tempMin}°
                            <span className="arrow-down"></span>
                        </div>
                    </div>
                    <h1 id="current">
                        <span className="icon">
                            <i className={data.iconClass}></i>
                        </span>
                        <span className="temp">
                            {data.currTemp}°
                        </span>
                    </h1>
                    <ul id="info" className="detail">
                        <li id="wind">
                            <span className="icon">
                                <i className="wi wi-strong-wind"></i>
                            </span>
                            {data.windSpeed}
                            <span className="unit">
                                {data.windSpeedUnit}
                            </span>
                        </li>
                        <li id="dewpoint">
                            <span className="icon">
                                <i className="wi wi-raindrop"></i>
                            </span>
                            {data.dewPoint}°
                        </li>
                        <li id="humidity">
                            <span className="icon">
                                <i className="wi wi-raindrops"></i>
                            </span>
                            {data.humidity}%
                        </li>
                    </ul>
                </div>
                <div id="summary">
                    <div className="container">
                        <h2>
                            {data.summary}
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default DayForecast;