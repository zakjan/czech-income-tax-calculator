import React from 'react';
import PropTypes from 'prop-types';

import MoneyInput from 'app/moneyInput/moneyInput.js';


const EmployeeForm = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Hrubá mzda:</td>
          <td><MoneyInput period={props.period} value={props.grossSalary} onChange={props.setGrossSalary} /></td>
        </tr>
        <tr>
          <td>Benefity:</td>
          <td><MoneyInput period={props.period} value={props.benefit} onChange={props.setBenefit} /></td>
        </tr>
      </tbody>
    </table>
  );
};

EmployeeForm.propTypes = {
  grossSalary: PropTypes.number.isRequired,
  benefit: PropTypes.number.isRequired,
  setGrossSalary: PropTypes.func.isRequired,
  setBenefit: PropTypes.func.isRequired,
};


export default EmployeeForm;
