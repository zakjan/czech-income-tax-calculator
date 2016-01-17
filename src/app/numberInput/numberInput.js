import React from 'react';

import './numberInput.less';


const NumberInput = React.createClass({
  onKeyPress(e) {
    const char = String.fromCharCode(e.which);

    if (char && !char.match(/\d/)) {
      e.preventDefault();
    }
  },

  onChange(e) {
    const value = e.target.value;
    const parsedValue = parseFloat(value) || 0;
    this.props.onChange(parsedValue);
  },

  render() {
    return (
      <input
        className="number-input"
        type="text"
        value={this.props.value}
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}
      />
    );
  },
});

NumberInput.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};


export default NumberInput;
