'use strict';

import React from 'react';

import ContractorWithFlatExpensesForm from './contractorWithFlatExpensesForm.js';
import ContractorWithFlatExpensesDiagram from './contractorWithFlatExpensesDiagram.js';


var ContractorWithFlatExpenses = React.createClass({
  render() {
    return (
      <div>
        <h2>OSVČ s paušálními výdaji</h2>
        <ContractorWithFlatExpensesForm />
        <ContractorWithFlatExpensesDiagram income="1620000" expense="100000" flatExpenseRatio="0.6" />
      </div>
    );
  },
});


export default ContractorWithFlatExpenses;
