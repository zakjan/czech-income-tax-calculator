import React from 'react';

import AppForm from 'app/appForm.js';
import ContractorWithFlatExpenses from 'app/contractorWithFlatExpenses/contractorWithFlatExpenses.js';
import Contractor from 'app/contractor/contractor.js';
import Employee from 'app/employee/employee.js';
import TaxPayerType from 'models/taxPayerType.js';

import './app.less';


const App = (props) => {
  let diagram;
  if (props.taxPayerType === TaxPayerType.EMPLOYEE) {
    diagram = (<Employee {...props} />);
  } else if (props.taxPayerType === TaxPayerType.CONTRACTOR) {
    diagram = (<Contractor {...props} />);
  } else if (props.taxPayerType === TaxPayerType.CONTRACTOR_WITH_FLAT_EXPENSES) {
    diagram = (<ContractorWithFlatExpenses {...props} />);
  }

  return (
    <div className="app">
      <h1>Kalkulačka daně z příjmů</h1>
      <AppForm {...props} />
      {diagram}
      <p><small><a href="https://github.com/zakjan/czech-income-tax-calculator">GitHub</a></small></p>
    </div>
  );
};


export default App;
