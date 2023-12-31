import React from 'react';
import PropTypes from 'prop-types';

import MoneyInput from 'app/moneyInput/moneyInput.js';
import NumberInput from 'app/numberInput/numberInput.js';
import TaxCalculator from 'services/taxCalculator.js';
import formatCurrency from 'services/formatCurrency.js';


const EmployeeForm = props => {
  const { period, employee: { grossSalary, benefit, unpaidDays }} = props;

  const activeGrossSalary = TaxCalculator.activeAmountWithoutUnpaidDays(grossSalary, unpaidDays);

  return (
    <table>
      <tbody>
        <tr>
          <td width="150">Hrubá mzda:</td>
          <td width="150"><MoneyInput period={period} value={grossSalary} onChange={props.setEmployeeGrossSalary} /></td>
          <td align="right">{formatCurrency(activeGrossSalary)} / rok</td>
        </tr>
        <tr>
          <td>Osvobozené příspěvky:</td>
          <td><MoneyInput period={period} value={benefit} onChange={props.setEmployeeBenefit} /></td>
          <td align="right">{formatCurrency(benefit)} / rok</td>
        </tr>
        <tr>
          <td>Neplacené volno:</td>
          <td><NumberInput value={unpaidDays} onChange={props.setEmployeeUnpaidDays} /> dnů / rok</td>
        </tr>
      </tbody>
    </table>
  );
};

EmployeeForm.propTypes = {
  period: PropTypes.string.isRequired,
  employee: PropTypes.shape({
    grossSalary: PropTypes.number.isRequired,
    benefit: PropTypes.number.isRequired,
  }),
  setEmployeeGrossSalary: PropTypes.func.isRequired,
  setEmployeeBenefit: PropTypes.func.isRequired,
};


export default EmployeeForm;
