import React from 'react';

import EmployeeTab from './employee/tab.js';
import ContractorTab from './contractor/tab.js';


const TaxPayerTab = props => {
  return (
    <div>
      <EmployeeTab {...props} />
      <ContractorTab {...props} />
    </div>
  );
};


export default TaxPayerTab;
