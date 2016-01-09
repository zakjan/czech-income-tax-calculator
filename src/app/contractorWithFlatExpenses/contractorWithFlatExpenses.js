'use strict';

import React from 'react';

import ContractorWithFlatExpensesDiagram from './contractorWithFlatExpensesDiagram.js';


const ContractorWithFlatExpenses = (props) => {
  return (
    <div>
      <h2>OSVČ s paušálními výdaji</h2>
      <ContractorWithFlatExpensesDiagram {...props} />
    </div>
  );
};


export default ContractorWithFlatExpenses;
