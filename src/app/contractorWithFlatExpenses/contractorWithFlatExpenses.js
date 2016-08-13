import React from 'react';

import ContractorWithFlatExpensesForm from './contractorWithFlatExpensesForm.js';
import ContractorWithFlatExpensesDiagram from './contractorWithFlatExpensesDiagram.js';


const ContractorWithFlatExpenses = (props) => {
  return (
    <div>
      <h2>OSVČ s paušálními výdaji</h2>
      <ContractorWithFlatExpensesForm {...props} />
      <ContractorWithFlatExpensesDiagram {...props} />
    </div>
  );
};


export default ContractorWithFlatExpenses;
