import React from 'react';
import PropTypes from 'prop-types';

import TaxPayerType from 'models/taxPayerType.js';


const AppForm = props => {
  return (
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
  );
};

AppForm.propTypes = {
  income: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
  flatExpenseRate: PropTypes.number.isRequired,
  setIncome: PropTypes.func.isRequired,
  setExpense: PropTypes.func.isRequired,
  setFlatExpenseRate: PropTypes.func.isRequired,
};


export default AppForm;
