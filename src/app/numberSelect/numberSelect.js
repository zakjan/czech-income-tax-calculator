import React from 'react';
import PropTypes from 'prop-types';


class NumberSelect extends React.Component {
  onChange(e) {
    const value = e.target.value;
    const parsedValue = parseFloat(value) || 0;
    this.props.onChange(parsedValue);
  }

  render() {
    return (
      <select value={this.props.value} onChange={this.onChange.bind(this)}>
        {this.props.children}
      </select>
    );
  }
}

NumberSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default NumberSelect;
