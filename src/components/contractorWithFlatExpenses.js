'use strict';

import React from 'react';

import ContractorWithFlatExpensesForm from './contractorWithFlatExpensesForm.js';
import ContractorWithFlatExpensesDiagram from './contractorWithFlatExpensesDiagram.js';


const ContractorWithFlatExpenses = (props) => {
  return (
    <div>
      <h2>OSVČ s paušálními výdaji</h2>
      <ContractorWithFlatExpensesForm
        income={props.income}
        expense={props.expense}
        flatExpenseRatio={props.flatExpenseRatio}
        onChangeIncome={props.onChangeIncome}
        onChangeExpense={props.onChangeExpense}
        onChangeFlatExpenseRatio={props.onChangeFlatExpenseRatio}
      />
      <ContractorWithFlatExpensesDiagram
        income={props.income}
        expense={props.expense}
        flatExpenseRatio={props.flatExpenseRatio}
      />
    </div>
  );
};


export default ContractorWithFlatExpenses;
