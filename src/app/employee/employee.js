'use strict';

import React from 'react';

import EmployeeDiagram from './employeeDiagram.js';


const Employee = (props) => {
  return (
    <div>
      <h2>Zaměstanec</h2>
      <EmployeeDiagram {...props} />
    </div>
  );
};


export default Employee;
