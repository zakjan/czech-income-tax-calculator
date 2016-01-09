'use strict';

import React from 'react';


const ContractorWithFlatExpensesForm = (props) => {
  return (
    <div>
      <div>
        <label>Příjmy:</label>
        {' '}
        <input
          type="number"
          value={props.income}
          onChange={(e) => props.setIncome(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Výdaje:</label>
        {' '}
        <input
          type="number"
          value={props.expense}
          onChange={(e) => props.setExpense(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Procento paušálních výdajů:</label>
        {' '}
        <select
          value={props.flatExpenseRatio}
          onChange={(e) => props.setFlatExpenseRatio(parseFloat(e.target.value))}
        >
          <option value="0.4">40%</option>
          <option value="0.6">60%</option>
          <option value="0.8">80%</option>
        </select>
      </div>
    </div>
  );
};

ContractorWithFlatExpensesForm.propTypes = {
  income: React.PropTypes.number.isRequired,
  expense: React.PropTypes.number.isRequired,
  flatExpenseRatio: React.PropTypes.number.isRequired,
  setIncome: React.PropTypes.func.isRequired,
  setExpense: React.PropTypes.func.isRequired,
  setFlatExpenseRatio: React.PropTypes.func.isRequired,
};


export default ContractorWithFlatExpensesForm;
