import React from 'react';
import PropTypes from 'prop-types';

import TaxPayerType from 'models/taxPayerType.js';
import Period from 'models/period.js';


const AppForm = props => {
  return (
    <div>
      <h3>Typ poplatníka</h3>
      <p>
        <label>
          <input
            type="radio"
            name="taxPayerType"
            value={TaxPayerType.EMPLOYEE}
            checked={props.taxPayerType === TaxPayerType.EMPLOYEE}
            onChange={event => props.setTaxPayerType(event.target.value)}
          />
          Zaměstnanec
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="taxPayerType"
            value={TaxPayerType.CONTRACTOR}
            checked={props.taxPayerType === TaxPayerType.CONTRACTOR}
            onChange={event => props.setTaxPayerType(event.target.value)}
          />
          OSVČ
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="taxPayerType"
            value={TaxPayerType.CONTRACTOR_WITH_FLAT_EXPENSES}
            checked={props.taxPayerType === TaxPayerType.CONTRACTOR_WITH_FLAT_EXPENSES}
            onChange={event => props.setTaxPayerType(event.target.value)}
          />
          OSVČ s paušálními výdaji
        </label>
      </p>

      <h3>Částky za období</h3>
      <p>
        <label>
          <input
            type="radio"
            name="period"
            value={Period.YEAR}
            checked={props.period === Period.YEAR}
            onChange={event => props.setPeriod(event.target.value)}
          />
          Kč / rok
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="period"
            value={Period.MONTH}
            checked={props.period === Period.MONTH}
            onChange={event => props.setPeriod(event.target.value)}
          />
          Kč / měsíc
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="period"
            value={Period.DAY}
            checked={props.period === Period.DAY}
            onChange={event => props.setPeriod(event.target.value)}
          />
          Kč / den
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="period"
            value={Period.HOUR}
            checked={props.period === Period.HOUR}
            onChange={event => props.setPeriod(event.target.value)}
          />
          Kč / hodina
        </label>
      </p>
    </div>
  );
};

AppForm.propTypes = {
  income: PropTypes.number.isRequired,
  benefit: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
  flatExpenseRate: PropTypes.number.isRequired,
  sicknessInsurance: PropTypes.bool.isRequired,
  setIncome: PropTypes.func.isRequired,
  setBenefit: PropTypes.func.isRequired,
  setExpense: PropTypes.func.isRequired,
  setSicknessInsurance: PropTypes.func.isRequired,
};


export default AppForm;
