import React from 'react';

import EmployeeForm from './form.js';
import EmployeeDiagram from './diagram.js';


const EmployeeTab = (props) => {
  return (
    <div>
      <h2>Zaměstanec</h2>
      <EmployeeForm {...props} />
      <EmployeeDiagram {...props} />
    </div>
  );
};


export default EmployeeTab;
