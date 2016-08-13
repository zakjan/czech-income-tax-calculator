import React from 'react';

import ContractorWithFlatExpensesForm from './form.js';
import ContractorWithFlatExpensesDiagram from './diagram.js';


const ContractorWithFlatExpensesTab = (props) => {
  return (
    <div>
      <h2>OSVČ s paušálními výdaji</h2>
      <ContractorWithFlatExpensesForm {...props} />
      <ContractorWithFlatExpensesDiagram {...props} />
    </div>
  );
};


export default ContractorWithFlatExpensesTab;
