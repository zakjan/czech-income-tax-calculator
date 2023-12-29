import React from 'react';

import ContractorTab from './contractor/tab.js';
import EmployeeTab from './employee/tab.js';
import TaxPayerType from 'models/taxPayerType.js';


const TaxPayerTab = props => {
  if (props.taxPayerType === TaxPayerType.EMPLOYEE) {
    return (<EmployeeTab {...props} />);
  }
  if (props.taxPayerType === TaxPayerType.CONTRACTOR) {
    return (<ContractorTab {...props} />);
  }
  throw new Error('Not implemented');
};


export default TaxPayerTab;
