import React from 'react';
import PropTypes from 'prop-types';

import MoneyInput from 'app/moneyInput/moneyInput.js';

import './incomeInput.less';


class IncomeInput extends React.Component {
  onChangeIncomePerMonth(value) {
    this.props.onChange(value * 12);
  }

  onChangeIncomePerDay(value) {
    this.props.onChange(value * 12 * 20);
  }

  onChangeIncomePerHour(value) {
    this.props.onChange(value * 12 * 20 * 8);
  }

  render() {
    const income = this.props.value;
    const incomePerMonth = Math.floor(income / 12);
    const incomePerDay = Math.floor(income / (12 * 20));
    const incomePerHour = Math.floor(income / (12 * 20 * 8));

    return (
      <div className="income-input">
        <p><MoneyInput value={income} onChange={this.props.onChange} /></p>
        <p><MoneyInput value={incomePerMonth} onChange={this.onChangeIncomePerMonth} /> / měsíc</p>
        <p><MoneyInput value={incomePerDay} onChange={this.onChangeIncomePerDay} /> / den</p>
        <p><MoneyInput value={incomePerHour} onChange={this.onChangeIncomePerHour} /> / hodina</p>
      </div>
    );
  }
}

IncomeInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default IncomeInput;
