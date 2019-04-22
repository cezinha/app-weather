import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../css/app.scss';
import '../css/weather-icons.scss';
import MainPage from './components/main.jsx';

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