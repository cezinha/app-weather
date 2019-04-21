import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HoursForecast from './components/hoursforecast.jsx';
import DayForecast from './components/dayforecast.jsx';
import WeekForecast from './components/weekforecast.jsx';
import Header from './components/header.jsx';
import '../css/app.scss';
import '../css/weather-icons.scss';
import MainPage from './components/main.jsx';
/*
function getParams(location) {
    const searchParams = new URLSearchParams(location.search);
    return {
      query: searchParams.get('query') || ''
    };
}

function MainPage ({ location }) {
    let params = new URLSearchParams(location.search);
    
    return (
        <div id="main">
            <Header />
            <DayForecast />
            <HoursForecast />
            <WeekForecast />
            <div>
                {params.get("location")}
            </div>
        </div>
    );
}
*/
class App extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" component={MainPage} />
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));