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
          onChange={(e) => props.onChangeIncome(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Výdaje:</label>
        {' '}
        <input
          type="number"
          value={props.expense}
          onChange={(e) => props.onChangeExpense(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Procento paušálních výdajů:</label>
        {' '}
        <select
          value={props.flatExpenseRatio}
          onChange={(e) => props.onChangeFlatExpenseRatio(parseFloat(e.target.value))}
        >
          <option value="0.4">40%</option>
          <option value="0.6">60%</option>
          <option value="0.8">80%</option>
        </select>
      </div>
    </div>
  );
};


export default ContractorWithFlatExpensesForm;
