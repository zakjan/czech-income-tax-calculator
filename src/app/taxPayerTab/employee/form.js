import React from 'react';
import PropTypes from 'prop-types';

import MoneyInput from 'app/moneyInput/moneyInput.js';
import formatCurrency from 'services/formatCurrency.js';


const EmployeeForm = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td width="110">Hrubá mzda:</td>
          <td width="150"><MoneyInput period={props.period} value={props.grossSalary} onChange={props.setGrossSalary} /></td>
          <td align="right">{formatCurrency(props.grossSalary)} / rok</td>
        </tr>
        <tr>
          <td>Benefity:</td>
          <td><MoneyInput period={props.period} value={props.benefit} onChange={props.setBenefit} /></td>
          <td align="right">{formatCurrency(props.benefit)} / rok</td>
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
