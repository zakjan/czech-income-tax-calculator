import React from 'react';

import NumberInput from 'app/numberInput/numberInput.js';


const MoneyInput = React.createClass({
  render() {
    return (
      <span>
        <NumberInput value={this.props.value} onChange={this.props.onChange} />
        {' '}
        Kč
      </span>
    );
  },
});

MoneyInput.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};


export default MoneyInput;
