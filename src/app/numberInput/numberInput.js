import React from 'react';
import PropTypes from 'prop-types';

import './numberInput.less';


class NumberInput extends React.Component {
  onKeyPress(e) {
    const char = String.fromCharCode(e.which);

    if (char && !char.match(/\d/)) {
      e.preventDefault();
    }
  }

  onChange(e) {
    const value = e.target.value;
    const parsedValue = parseFloat(value) || 0;
    this.props.onChange(parsedValue);
  }

  render() {
    return (
      <input
        className="number-input"
        type="text"
        value={this.props.value}
        onKeyPress={this.onKeyPress.bind(this)}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}

NumberInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default NumberInput;
