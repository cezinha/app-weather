import React, { Component } from 'react';
import { convertIcon } from '../util';
import { DateTime } from 'luxon';

import './weekforecast.scss';

function DayForecast(props) {
    var w = Math.ceil(Number(props.percent)/100 * 140);
    var styleObj = { width: w + "px" };
    var classTemp = "bar ";
    if (Number(props.percent) > 75) {
        classTemp += "hot";
    } else if (Number(props.percent) > 50) {
        classTemp += "warm";
    } else if (Number(props.percent) > 25) {
        classTemp += "cold";
    } else {
        classTemp += "freeze";
    }

    return (
        <li>
            <div className="icon"><i className={props.icon}></i></div>
            <div className="day-name">
                {props.day}
            </div>
            <div className="tempRange" style={styleObj}>
                <span className="minTemp">
                    {props.minTemp}°
                </span>
                <span className={classTemp}></span>
                <span className="maxTemp">
                    {props.maxTemp}°
                </span>
            </div>
        </li>
    );
}
/* mock
var weekforecast = [
    {day: "SUN", minTemp: 25, maxTemp: 27, percent: 50},
    {day: "MON", minTemp: 20, maxTemp: 27, percent: 75},
    {day: "TUE", minTemp: 25, maxTemp: 33, percent: 50},
    {day: "WED", minTemp: 15, maxTemp: 20, percent: 20},
    {day: "THU", minTemp: 17, maxTemp: 23, percent: 30},
    {day: "FRI", minTemp: 20, maxTemp: 32, percent: 80},
    {day: "SAT", minTemp: 25, maxTemp: 27, percent: 60}
];
*/
function getData(data) {
    let res = [],
        daily = data.daily.data,
        offset = data.offset;

    /*let now = new Date(),
        userTime = now.getTime(),
        userOffset = now.getTimezoneOffset() * 60000,
        utc = userTime + userOffset,
        city = utc + (3600000*offset),
        cityTime = new Date(city);*/

    const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    for (let i = 0; i < daily.length; i ++) {
        let today = DateTime.local().setZone(data.timezone);
        let cityDate = DateTime.fromMillis(Number(daily[i].time)*1000).setZone(data.timezone);

        if (today < cityDate) {
            let o = {};
            o.day = cityDate.weekdayShort;
            o.minTemp = Math.ceil(Number(daily[i].temperatureMin));
            o.maxTemp = Math.ceil(Number(daily[i].temperatureMax));
            o.icon = 'wi ' + convertIcon(daily[i].icon);

            res.push(o);
        }
    }

    return res;
}

class WeekForecast extends Component {
    render() {
        if (this.props.data) {
            let data = getData(this.props.data);
            let weekMaxTemp = Math.max.apply(Math, data.map(function(o) { return o.maxTemp; }));
            let weekMinTemp = Math.min.apply(Math, data.map(function(o) { return o.minTemp; }));

            let updatedList = data.map((forecast, i) => {
                let key = 'k'+i;
                let percent = Math.ceil((forecast.maxTemp - forecast.minTemp) / (weekMaxTemp - weekMinTemp) * 100); 

                return <DayForecast key={key} day={forecast.day} minTemp={forecast.minTemp} maxTemp={forecast.maxTemp} percent={percent} icon={forecast.icon} />
            });

            return (
                <div id="week-forecast">
                    <ul>
                        {updatedList}
                    </ul>
                </div>
            );
        }

        return (
            <div id="week-forecast">
                Loading
            </div>
        );
    }
}

export default WeekForecast;