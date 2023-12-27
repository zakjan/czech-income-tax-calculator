import React from 'react';
import PropTypes from 'prop-types';

import NumberInput from 'app/numberInput/numberInput.js';
import PeriodLabel from 'models/periodLabel.js';
import PeriodFactor from 'models/periodFactor.js';


class MoneyInput extends React.Component {
  onChange(value) {
    this.props.onChange(value * PeriodFactor[this.props.period]);
  }

  render() {
    const value = Math.floor(this.props.value / PeriodFactor[this.props.period]);

    return (
      <span>
        <NumberInput value={value} onChange={this.onChange.bind(this)} />
        {' '}
        Kč / {PeriodLabel[this.props.period]}
      </span>
    );
  }
}

MoneyInput.propTypes = {
  period: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default MoneyInput;
