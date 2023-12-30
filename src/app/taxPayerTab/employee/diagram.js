import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const EmployeeDiagram = props => {
  const periodFactor = PeriodFactor[props.period];

  const grossSalary = props.income;
  const benefit = props.benefit;

  const employerSocialInsurance = TaxCalculator.employerSocialInsuranceFromGrossSalary(grossSalary);
  const employerSicknessInsurance = TaxCalculator.employerSicknessInsuranceFromGrossSalary(grossSalary);
  const employerHealthInsurance = TaxCalculator.employerHealthInsuranceFromGrossSalary(grossSalary);
  const employeeSocialInsurance = TaxCalculator.employeeSocialInsuranceFromGrossSalary(grossSalary);
  const employeeSicknessInsurance = TaxCalculator.employeeSicknessInsuranceFromGrossSalary(grossSalary);
  const employeeHealthInsurance = TaxCalculator.employeeHealthInsuranceFromGrossSalary(grossSalary);

  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(grossSalary);
  const netSalary = grossSalary - incomeTax - employeeSocialInsurance - employeeSicknessInsurance - employeeHealthInsurance;

  const nodes = [
    { id: 'employerExpense', name: 'Náklady zaměstnavatele', color: '#1f77b4' },

    { id: 'employerSocialInsurance', name: 'Sociální pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 'employerSicknessInsurance', name: 'Nemocenské pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 'employerHealthInsurance', name: 'Zdravotní pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 'grossSalary', name: 'Hrubá mzda', color: '#aec7e8' },
    { id: 'benefit', name: 'Benefity', color: '#aec7e8' },

    { id: 'employerSocialInsuranceDummy' },
    { id: 'employerSicknessInsuranceDummy' },
    { id: 'employerHealthInsuranceDummy' },
    { id: 'incomeTax', name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 'employeeSocialInsurance', name: 'Sociální pojištění zaměstnance', color: '#ffbb78' },
    { id: 'employeeSicknessInsurance', name: 'Nemocenské pojištění zaměstnance', color: '#ffbb78' },
    { id: 'employeeHealthInsurance', name: 'Zdravotní pojištění zaměstnance', color: '#ffbb78' },
    { id: 'netSalary', name: 'Čistá mzda', color: '#aec7e8' },
    { id: 'benefitDummy' },

    { id: 'taxes', name: 'Daně', color: '#d62728' },
    { id: 'netSalaryWithBenefit', name: 'Čistá mzda s benefity', color: '#2ca02c' },
  ];
  const links = [
    { source: 'employerExpense', target: 'employerSocialInsurance', value: employerSocialInsurance / periodFactor },
    { source: 'employerExpense', target: 'employerSicknessInsurance', value: employerSicknessInsurance / periodFactor },
    { source: 'employerExpense', target: 'employerHealthInsurance', value: employerHealthInsurance / periodFactor },
    { source: 'employerExpense', target: 'grossSalary', value: grossSalary / periodFactor },
    { source: 'employerExpense', target: 'benefit', value: benefit / periodFactor },

    { source: 'employerSocialInsurance', target: 'employerSocialInsuranceDummy', value: employerSocialInsurance / periodFactor },
    { source: 'employerSicknessInsurance', target: 'employerSicknessInsuranceDummy', value: employerSicknessInsurance / periodFactor },
    { source: 'employerHealthInsurance', target: 'employerHealthInsuranceDummy', value: employerHealthInsurance / periodFactor },
    { source: 'grossSalary', target: 'incomeTax', value: incomeTax / periodFactor },
    { source: 'grossSalary', target: 'employeeSocialInsurance', value: employeeSocialInsurance / periodFactor },
    { source: 'grossSalary', target: 'employeeSicknessInsurance', value: employeeSicknessInsurance / periodFactor },
    { source: 'grossSalary', target: 'employeeHealthInsurance', value: employeeHealthInsurance / periodFactor },
    { source: 'grossSalary', target: 'netSalary', value: netSalary / periodFactor },
    { source: 'benefit', target: 'benefitDummy', value: benefit / periodFactor },

    { source: 'employerSocialInsuranceDummy', target: 'taxes', value: employerSocialInsurance / periodFactor },
    { source: 'employerSicknessInsuranceDummy', target: 'taxes', value: employerSicknessInsurance / periodFactor },
    { source: 'employerHealthInsuranceDummy', target: 'taxes', value: employerHealthInsurance / periodFactor },
    { source: 'incomeTax', target: 'taxes', value: incomeTax / periodFactor },
    { source: 'employeeSocialInsurance', target: 'taxes', value: employeeSocialInsurance / periodFactor },
    { source: 'employeeSicknessInsurance', target: 'taxes', value: employeeSicknessInsurance / periodFactor },
    { source: 'employeeHealthInsurance', target: 'taxes', value: employeeHealthInsurance / periodFactor },
    { source: 'netSalary', target: 'netSalaryWithBenefit', value: netSalary / periodFactor },
    { source: 'benefitDummy', target: 'netSalaryWithBenefit', value: benefit / periodFactor },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

EmployeeDiagram.propTypes = {
  income: PropTypes.number.isRequired,
};


export default EmployeeDiagram;
