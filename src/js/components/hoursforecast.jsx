import React, { Component } from 'react';
import $ from 'jquery';
import { convertIcon } from '../util';

import './hoursforecast.scss';

function drawGraph() {
  var table = $('#hours');
  var tds = table.find('td.time');
  var bar = $('#temp-bar');
  var initpos = table.find('td.temp').eq(0).position();
  var container = $('#hours-content .container');

  bar.css({
    top: 0,
    left: initpos.left
  });

  container.css({
    width: table.width()
  });
  
  // SET BASE SIZE
  var td = table.find('td.temp').eq(0);
  var tdH = pxToNumber(td.css('padding-top'));
  tdH += pxToNumber(td.css('padding-bottom'));
  tdH += td.height();
  var tdW = pxToNumber(td.css('padding-left'));
  tdW += pxToNumber(td.css('padding-right'));
  tdW += td.width();

  var sizes = [];
  var times = [];
  var hour = tds.eq(1).text();
  var type = 'noon';
  
  tds.map(function(i) {
    hour = (tds.eq(i).text() == "Now") ? tds.eq(1).text() : tds.eq(i).text();
    if (hour.match(/\d+:\d+/)) {
      hour = Number(hour.replace(/(\d+):\d+/, '$1'));
    } else {
      hour = (hour.toUpperCase() == "12 AM") ? 0 : (hour.toUpperCase() == "12 PM") ? 12 : (hour.toUpperCase().indexOf('AM') > -1) ? Number(hour.replace(/(\d+) (am|pm)/gi, '$1')) : Number(hour.replace(/(\d+) (am|pm)/gi, '$1')) + 12;
    }
    if (hour < 7) {
      type = 'dawn';
    } else if (hour < 12) {
      type = 'morning';
    } else if (hour < 17) {
      type = 'noon';
    } else if (hour > 20) {
      type = 'night';
    } else {
      type = 'evening';
    }
    times.push(type);
  });

  var lastVal = times[0];
  var lastSize = 0;
  times.map(function(time, i) {
    if (lastVal != time) {
      sizes.push({ size: lastSize, css: lastVal });
      lastVal = time;
      lastSize = 0;
    }
    lastSize ++;
    if ((times.length - 1) == i) {
      sizes.push({ size: lastSize, css: time });
    }
  });

  bar.find('.colorbar').remove();
  sizes.map(function(i) {
    bar.append('<span class="colorbar"></span>');
    var appended = bar.find('.colorbar').eq(bar.find('.colorbar').length-1);
    appended.height(i.size*tdH);
    appended.addClass(i.css);
  });

  bar.find('.colorbar').width(tdW);
}

function pxToNumber(val) {
  return Number(val.replace('px', ''));
}

function HourForecast(props) {
  return (
    <tr>
      <td className="time">
        {props.time}
      </td>
      <td className="temp">
        {props.temp}
      </td>
      <td className="icon">
        <i className={props.icon}></i>
      </td>
    </tr>
  );
}
/*
var forecast = [
    {time: "Now", temp: 25, icon: "wi wi-night-clear" },
    {time: "11:00", temp: 23, icon: "wi wi-night-clear" },
    {time: "13:00", temp: 24, icon: "wi wi-night-clear" },
    {time: "15:00", temp: 24, icon: "wi wi-night-clear" },
    {time: "17:00", temp: 24, icon: "wi wi-night-clear" },
    {time: "19:00", temp: 20, icon: "wi wi-night-clear" },
    {time: "21:00", temp: 18, icon: "wi wi-night-clear" },
    {time: "23:00", temp: 18, icon: "wi wi-night-clear" },
    {time: "01:00", temp: 16, icon: "wi wi-night-clear" }
];
*/

function getData(data) {
  let res = [],
    hourly = data.hourly.data,
    offset = data.offset;

  let now = new Date(),
    userTime = now.getTime(),
    userOffset = now.getTimezoneOffset() * 60000,
    utc = userTime + userOffset,
    city = utc + (3600000*offset),
    cityTime = new Date(city);

  let count = 0;
  for (let i = 0; i < hourly.length; i += 2) {
    let dataTime = Number(hourly[i].time)*1000;
    let hour = new Date(dataTime + (360000*offset));

    let time = hour.toLocaleTimeString();
    time = (time.match(/\d+ (am|pm)/gi)) ? time.replace(/.*?(\d+)\:\d+\:\d+/, "$1") : time.replace(/.*?(\d+)\:\d+\:\d+/, "$1") + ":00"; 
    if (count < 13) {
      let o = {};
      o.temp = Math.ceil(Number(hourly[i].temperature));
      o.time = time;
      o.icon = 'wi ' + convertIcon(hourly[i].icon);

      res.push(o);
      count ++;
    } else {
      break;
    }
  }
  res[0].time = "Now";

  return res;
}

class HoursForecast extends Component {
    render() {
      if (this.props.data) {
        let data = getData(this.props.data);
        let updatedList = data.map((day, i) => {
          let key = 'k'+i;
          return <HourForecast key={key} time={day.time} temp={day.temp} icon={day.icon} />
      });

        return (
          <div id="hours-content">
            <div className="container">
              <table id="hours">
                <tbody>
                  {updatedList}
                </tbody>
              </table>
              <div id="temp-bar"></div>
            </div>
          </div>
        );
      }

      return (
        <div id="hours-content">
          <div className="container">
            Loading
          </div>
        </div>
      );
    }

    componentDidMount() {
      drawGraph();
    }

    componentDidUpdate() {
      drawGraph();
    }
}

export default HoursForecast;