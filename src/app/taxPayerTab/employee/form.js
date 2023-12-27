import React from 'react';

import MoneyInput from 'app/moneyInput/moneyInput.js';


const EmployeeForm = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Hrubá mzda:</td>
          <td><MoneyInput period={props.period} value={props.income} onChange={props.setIncome} /></td>
        </tr>
        <tr>
          <td>Benefity:</td>
          <td><MoneyInput period={props.period} value={props.benefit} onChange={props.setBenefit} /></td>
        </tr>
      </tbody>
    </table>
  );
};


export default EmployeeForm;
