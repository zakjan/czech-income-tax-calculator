import React from 'react';

import TaxPayerType from 'models/taxPayerType.js';


const AppForm = (props) => {
  return (
    <p>
      <label>
        <input
          type="radio"
          name="taxPayerType"
          value={TaxPayerType.CONTRACTOR_WITH_FLAT_EXPENSES}
          checked={props.taxPayerType === TaxPayerType.CONTRACTOR_WITH_FLAT_EXPENSES}
          onChange={(event) => props.setTaxPayerType(event.target.value)}
        />
        OSVČ s paušálními výdaji
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="taxPayerType"
          value={TaxPayerType.CONTRACTOR}
          checked={props.taxPayerType === TaxPayerType.CONTRACTOR}
          onChange={(event) => props.setTaxPayerType(event.target.value)}
        />
        OSVČ
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="taxPayerType"
          value={TaxPayerType.EMPLOYEE}
          checked={props.taxPayerType === TaxPayerType.EMPLOYEE}
          onChange={(event) => props.setTaxPayerType(event.target.value)}
        />
        Zaměstnanec
      </label>
    </p>
  );
};

AppForm.propTypes = {
  income: React.PropTypes.number.isRequired,
  expense: React.PropTypes.number.isRequired,
  flatExpenseRate: React.PropTypes.number.isRequired,
  setIncome: React.PropTypes.func.isRequired,
  setExpense: React.PropTypes.func.isRequired,
  setFlatExpenseRate: React.PropTypes.func.isRequired,
};


export default AppForm;
