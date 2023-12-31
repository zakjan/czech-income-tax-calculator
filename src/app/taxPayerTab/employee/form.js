import React from 'react';
import PropTypes from 'prop-types';

import MoneyInput from 'app/moneyInput/moneyInput.js';
import NumberInput from 'app/numberInput/numberInput.js';
import TaxCalculator from 'services/taxCalculator.js';
import formatCurrency from 'services/formatCurrency.js';


const EmployeeForm = props => {
  const { period, employee: { grossSalary, benefitTaxExpense, benefitNonTaxExpense, unpaidDays }} = props;

  const activeGrossSalary = TaxCalculator.activeAmountWithoutUnpaidDays(grossSalary, unpaidDays);

  return (
    <table>
      <tbody>
        <tr>
          <td width="175">Hrubá mzda:</td>
          <td width="150"><MoneyInput period={period} value={grossSalary} onChange={props.setEmployeeGrossSalary} /></td>
          <td align="right">{formatCurrency(activeGrossSalary)} / rok</td>
        </tr>
        <tr>
          <td>Benefity - daňové náklady:</td>
          <td><MoneyInput period={period} value={benefitTaxExpense} onChange={props.setEmployeeBenefitTaxExpense} /></td>
          <td align="right">{formatCurrency(benefitTaxExpense)} / rok</td>
        </tr>
        <tr>
          <td>Benefity - nedaňové náklady:</td>
          <td><MoneyInput period={period} value={benefitNonTaxExpense} onChange={props.setEmployeeBenefitNonTaxExpense} /></td>
          <td align="right">{formatCurrency(benefitNonTaxExpense)} / rok</td>
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
    benefitTaxExpense: PropTypes.number.isRequired,
    benefitNonTaxExpense: PropTypes.number.isRequired,
  }),
  setEmployeeGrossSalary: PropTypes.func.isRequired,
  setEmployeeBenefitTaxExpense: PropTypes.func.isRequired,
};


export default EmployeeForm;
