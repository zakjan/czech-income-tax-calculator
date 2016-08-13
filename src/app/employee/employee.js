import React from 'react';

import EmployeeForm from './employeeForm.js';
import EmployeeDiagram from './employeeDiagram.js';


const Employee = (props) => {
  return (
    <div>
      <h2>Zaměstanec</h2>
      <EmployeeForm {...props} />
      <EmployeeDiagram {...props} />
    </div>
  );
};


export default Employee;
