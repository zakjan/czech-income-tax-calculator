import React from 'react';

import ContractorWithFlatExpensesTab from './contractorWithFlatExpenses/tab.js';
import ContractorTab from './contractor/tab.js';
import EmployeeTab from './employee/tab.js';
import TaxPayerType from 'models/taxPayerType.js';


const TaxPayerTab = (props) => {
  if (props.taxPayerType === TaxPayerType.CONTRACTOR_WITH_FLAT_EXPENSES) {
    return (<ContractorWithFlatExpensesTab {...props} />);
  }
  if (props.taxPayerType === TaxPayerType.CONTRACTOR) {
    return (<ContractorTab {...props} />);
  }
  if (props.taxPayerType === TaxPayerType.EMPLOYEE) {
    return (<EmployeeTab {...props} />);
  }
  throw new Error('Not implemented');
};


export default TaxPayerTab;
