import React, { Component } from 'react';
import Select from 'react-select';
import { citiesOptions } from '../data/cities';
import chroma from 'chroma-js';

import './header.scss';

const colourStyles = {
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
        backgroundColor: isSelected ? '#fff' : '#373845',
        color: isSelected ? '#898CAB': '#373845',
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
  render() {
    return (
      <div id="header">
        <div className="container">
          <div id="city">
            <Select
              defaultValue={citiesOptions[2]}
              label="Select city"
              options={citiesOptions}
              styles={colourStyles}
            />
          </div>
          <div className="button degree" id="degree-c"><i className="wi wi-celsius"></i></div>
          <div className="button degree off" id="degree-f"><i className="wi wi-fahrenheit"></i></div>
        </div>
      </div>
    );
  }    
}

export default Header;