import React from 'react';

import AppForm from 'app/appForm.js';
import ContractorWithFlatExpenses from 'app/contractorWithFlatExpenses/contractorWithFlatExpenses.js';
import Contractor from 'app/contractor/contractor.js';
import Employee from 'app/employee/employee.js';

import './app.less';


const App = (props) => {
  return (
    <div className="app">
      <h1>Kalkulačka daně z příjmů</h1>
      <AppForm {...props} />
      <Employee {...props} />
      <ContractorWithFlatExpenses {...props} />
      <Contractor {...props} />
    </div>
  );
};


export default App;
