'use strict';

import React from 'react';


const NumberSelect = React.createClass({
  onChange(e) {
    const value = e.target.value;
    const parsedValue = parseFloat(value) || 0;
    this.props.onChange(parsedValue);
  },

  render() {
    return (
      <select value={this.props.value} onChange={this.onChange}>
        {this.props.children}
      </select>
    );
  },
});

NumberSelect.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};


export default NumberSelect;
