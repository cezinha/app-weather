import React, { Component } from 'react';
import Select from 'react-select';
import { citiesOptions } from '../data/cities';
import chroma from 'chroma-js';
import DegreeButtons from './degreebuttons.jsx';

import './header.scss';

const colourStyles = {
    placeholder: styles => ({
      ...styles,
      color: '#84889A'
    }),
    control: styles => ({ 
      ...styles, 
      backgroundColor: 'none', 
      borderColor: "transparent",
      minHeight: "18px"
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma('#00ff00');
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? '#747691' : isFocused ? '#6A99FF' : '#ffffff',
        color: isDisabled ? '#ccc' : isSelected ? '#fff': isFocused ? '#fff' : '#373845',
        cursor: isDisabled ? 'not-allowed' : 'default'
      };
    },
    singleValue: styles => ({
      ...styles,
      color: "#fff"
    }),
    indicatorSeparator: styles => ({
      ...styles,
      backgroundColor: "none",
      minHeight: "18px",
      margin: 0,
      padding: 0
    }),
    indicatorContainer: styles => ({
      ...styles,
      padding: 0
    })
};

class Header extends Component {
  constructor(props) {
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

    let onSelectCity = (item) => {
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