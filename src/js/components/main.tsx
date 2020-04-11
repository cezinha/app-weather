import * as React from 'react';
import HoursForecast from './hoursforecast';
import DayForecast from './dayforecast';
import WeekForecast from './weekforecast';
import Header from './header';
import '../../css/app.scss';
import '../../css/weather-icons.scss';
import '../../css/weather-icons-wind.scss';
import { RouteComponentProps } from 'react-router-dom';

interface IState {
    props: IProps,
    error: any,
    isLoaded: boolean,
    location: string,
    lastLocation: string,
    units: string,
    lastUnits: string,
    data: object
}

interface IProps extends RouteComponentProps<any> {}

class MainPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            props: props,
            location: '',
            lastLocation: '',
            units: '',
            lastUnits: '',
            error: null,
            isLoaded: false,
            data: {}
        };
    }

    componentDidMount() {
        if (("props" in this.state) && (typeof this.state.props == "object")) {
            let params = new URLSearchParams(this.state.props.location.search);
            if (params.get('location')) {
                this.setState({ location: params.get('location') });
            } else {
                this.setState({ location: "-23.6821592,-46.8761748" });
            }

            if (params.get('units')) {
                this.setState({ units: params.get('units') });
            } else {
                this.setState({ units: "si" });
            }
        }
    }

    componentDidUpdate() {
        if  ( ( this.state.lastLocation != this.state.location ) || ( this.state.lastUnits != this.state.units ) ) {
            if ( !this.state.isLoaded ) {
                let API_URL = "https://server-app-weather20.herokuapp.com/api/"
                //let API_URL = "https://server-app-weather20.herokuapp.com/data/sao-paulo.json"
                fetch(API_URL + '?location=' + this.state.location + "&units=" + this.state.units)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                lastLocation: this.state.location,
                                lastUnits: this.state.units,
                                data: result
                            });
                        }
                    ).catch((error) => {
                        this.setState({
                            isLoaded: true,
                            error: error
                        })
                    });
            }
        }
    }

    render() {
        const { error, isLoaded } = this.state;

        if (error) {
            return (
                <div id="error" className="centered-page">
                    <div className="center">
                        Error: {error.message}
                    </div>
                </div>
            );
        } else if(!isLoaded) {
            return (
                <div id="loading" className="centered-page">
                    <div className="center">
                        Loading
                    </div>
                </div>
            );
        } else {
            return (
                <div id="main">
                    <Header units={this.state.units} {...this.props} />
                    <DayForecast data={this.state.data} />
                    <HoursForecast data={this.state.data} />
                    <WeekForecast  data={this.state.data} />
                </div>
            );
        }
    }
}

export default MainPage;