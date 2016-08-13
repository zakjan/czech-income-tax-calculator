import React from 'react';

import IncomeInput from 'app/incomeInput/incomeInput.js';


const EmployeeForm = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Hrubá mzda:</td>
          <td><IncomeInput value={props.income} onChange={props.setIncome} /></td>
        </tr>
      </tbody>
    </table>
  );
};


export default EmployeeForm;
