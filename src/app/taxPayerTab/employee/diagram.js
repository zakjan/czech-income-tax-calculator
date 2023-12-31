import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const EmployeeDiagram = props => {
  const { period, employee: { grossSalary, benefitTaxExpense, benefitNonTaxExpense, unpaidDays }} = props;
  const periodFactor = PeriodFactor[period];

  const activeGrossSalary = TaxCalculator.activeAmountWithoutUnpaidDays(grossSalary, unpaidDays);

  const employerIncomeTax = TaxCalculator.corporateIncomeTaxFromIncomeTaxableBase(benefitNonTaxExpense);
  const employerSocialInsurance = TaxCalculator.employerSocialInsuranceFromGrossSalary(activeGrossSalary);
  const employerHealthInsurance = TaxCalculator.employerHealthInsuranceFromGrossSalary(activeGrossSalary);

  const employeeIncomeTax = TaxCalculator.personalIncomeTaxFromIncomeTaxableBase(activeGrossSalary);
  const employeeSocialInsurance = TaxCalculator.employeeSocialInsuranceFromGrossSalary(activeGrossSalary);
  const employeeHealthInsurance = TaxCalculator.employeeHealthInsuranceFromGrossSalary(activeGrossSalary);
  const netSalary = activeGrossSalary - employeeIncomeTax - employeeSocialInsurance - employeeHealthInsurance;

  const nodes = [
    { id: 'expense', name: 'Náklady', color: '#1f77b4' },

    { id: 'employerIncomeTax', name: 'Daň z příjmu zaměstnavatele', color: '#ffbb78' },
    { id: 'employerSocialInsurance', name: 'Sociální pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 'employerHealthInsurance', name: 'Zdravotní pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 'grossSalary', name: 'Hrubá mzda', color: '#aec7e8' },
    { id: 'benefitTaxExpense', name: 'Benefity - daňové náklady', color: '#aec7e8' },
    { id: 'benefitNonTaxExpense', name: 'Benefity - nedaňové náklady', color: '#aec7e8' },

    { id: 'employerIncomeTaxDummy' },
    { id: 'employerSocialInsuranceDummy' },
    { id: 'employerHealthInsuranceDummy' },
    { id: 'employeeIncomeTax', name: 'Daň z příjmu zaměstnance', color: '#ffbb78' },
    { id: 'employeeSocialInsurance', name: 'Sociální pojištění zaměstnance', color: '#ffbb78' },
    { id: 'employeeHealthInsurance', name: 'Zdravotní pojištění zaměstnance', color: '#ffbb78' },
    { id: 'netSalary', name: 'Čistá mzda', color: '#aec7e8' },
    { id: 'benefitTaxExpenseDummy' },
    { id: 'benefitNonTaxExpenseDummy' },

    { id: 'taxes', name: 'Daně', color: '#d62728' },
    { id: 'netSalaryWithBenefit', name: 'Čisté příjmy', color: '#2ca02c' },
  ];
  const links = [
    { source: 'expense', target: 'employerIncomeTax', value: employerIncomeTax / periodFactor },
    { source: 'expense', target: 'employerSocialInsurance', value: employerSocialInsurance / periodFactor },
    { source: 'expense', target: 'employerHealthInsurance', value: employerHealthInsurance / periodFactor },
    { source: 'expense', target: 'grossSalary', value: activeGrossSalary / periodFactor },
    { source: 'expense', target: 'benefitTaxExpense', value: benefitTaxExpense / periodFactor },
    { source: 'expense', target: 'benefitNonTaxExpense', value: benefitNonTaxExpense / periodFactor },

    { source: 'employerIncomeTax', target: 'employerIncomeTaxDummy', value: employerIncomeTax / periodFactor },
    { source: 'employerSocialInsurance', target: 'employerSocialInsuranceDummy', value: employerSocialInsurance / periodFactor },
    { source: 'employerHealthInsurance', target: 'employerHealthInsuranceDummy', value: employerHealthInsurance / periodFactor },
    { source: 'grossSalary', target: 'employeeIncomeTax', value: employeeIncomeTax / periodFactor },
    { source: 'grossSalary', target: 'employeeSocialInsurance', value: employeeSocialInsurance / periodFactor },
    { source: 'grossSalary', target: 'employeeHealthInsurance', value: employeeHealthInsurance / periodFactor },
    { source: 'grossSalary', target: 'netSalary', value: netSalary / periodFactor },
    { source: 'benefitTaxExpense', target: 'benefitTaxExpenseDummy', value: benefitTaxExpense / periodFactor },
    { source: 'benefitNonTaxExpense', target: 'benefitNonTaxExpenseDummy', value: benefitNonTaxExpense / periodFactor },

    { source: 'employerIncomeTaxDummy', target: 'taxes', value: employerIncomeTax / periodFactor },
    { source: 'employerSocialInsuranceDummy', target: 'taxes', value: employerSocialInsurance / periodFactor },
    { source: 'employerHealthInsuranceDummy', target: 'taxes', value: employerHealthInsurance / periodFactor },
    { source: 'employeeIncomeTax', target: 'taxes', value: employeeIncomeTax / periodFactor },
    { source: 'employeeSocialInsurance', target: 'taxes', value: employeeSocialInsurance / periodFactor },
    { source: 'employeeHealthInsurance', target: 'taxes', value: employeeHealthInsurance / periodFactor },
    { source: 'netSalary', target: 'netSalaryWithBenefit', value: netSalary / periodFactor },
    { source: 'benefitTaxExpenseDummy', target: 'netSalaryWithBenefit', value: benefitTaxExpense / periodFactor },
    { source: 'benefitNonTaxExpenseDummy', target: 'netSalaryWithBenefit', value: benefitNonTaxExpense / periodFactor },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

EmployeeDiagram.propTypes = {
  period: PropTypes.string.isRequired,
  employee: PropTypes.shape({
    grossSalary: PropTypes.number.isRequired,
    benefitTaxExpense: PropTypes.number.isRequired,
    benefitNonTaxExpense: PropTypes.number.isRequired,
  }),
};


export default EmployeeDiagram;
