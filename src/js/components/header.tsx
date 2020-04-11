import * as React from 'react';
import Select, { ClassNamesState } from 'react-select';
import * as CSS from 'csstype';
import { citiesOptions } from '../data/cities';
//import * as chroma from 'chroma-js';
import DegreeButtons from './degreebuttons';

import './header.scss';
import { RouteComponentProps } from 'react-router-dom';

const colourStyles = {
    placeholder: (styles: CSS.Properties) => ({
      ...styles,
      color: '#84889A'
    }),
    control: (styles: CSS.Properties) => ({
      ...styles,
      backgroundColor: 'none',
      borderColor: "transparent",
      minHeight: "18px"
    }),
    option: (styles: CSS.Properties, { isDisabled, isFocused, isSelected }:ClassNamesState) => {
      //const color = chroma('#00ff00');
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? '#747691' : isFocused ? '#6A99FF' : '#ffffff',
        color: isDisabled ? '#ccc' : isSelected ? '#fff': isFocused ? '#fff' : '#373845',
        cursor: isDisabled ? 'not-allowed' : 'default'
      };
    },
    singleValue: (styles: CSS.Properties) => ({
      ...styles,
      color: "#fff"
    }),
    indicatorSeparator: (styles: CSS.Properties) => ({
      ...styles,
      backgroundColor: "none",
      minHeight: "18px",
      margin: 0,
      padding: 0
    }),
    indicatorContainer: (styles: CSS.Properties) => ({
      ...styles,
      padding: 0
    })
};

interface IState {
  selectedOption: {value: string, label: string}
}

interface IProps extends RouteComponentProps<any> {
  units: string
}

class Header extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedOption : citiesOptions[7],
    };
  }

  render() {
    var selectedOption = this.state.selectedOption;
    let params = new URLSearchParams(location.search);
    if (params.get("location")) {
      for (let i = 0; i < citiesOptions.length; i++) {
        if (citiesOptions[i].value == params.get("location")) {
          selectedOption = citiesOptions[i];
          break;
        }
      }
    };

    let onSelectCity = (item: {value: string}) => {
      let params = new URLSearchParams(location.search);
      for (let i = 0; i < citiesOptions.length; i++) {
        if (citiesOptions[i].value == params.get("location")) {
          this.setState({ selectedOption: citiesOptions[i] });
          break;
        }
      }

      if (params.get("location") != item.value) {
        if (params.has("location")) {
          params.set("location", item.value);
        } else {
          params.append("location", item.value);
        }

        location.search = (params.toString());
      }
    }

    return (
      <div id="header">
        <div className="container">
          <div id="city">
            <Select
              value={selectedOption}
              placeholder="Select a city"
              options={citiesOptions}
              styles={colourStyles}
              onChange={onSelectCity}
            />
          </div>
          <DegreeButtons units={this.props.units} />
        </div>
      </div>
    );
  } 
}

export default Header;