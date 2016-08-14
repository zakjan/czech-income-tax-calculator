import React from 'react';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';


const EmployeeDiagram = (props) => {
  const wage = props.income;

  const employeeSocialInsurance = TaxCalculator.employeeSocialInsuranceFromWage(wage);
  const employeeHealthInsurance = TaxCalculator.employeeHealthInsuranceFromWage(wage);
  const employerSocialInsurance = TaxCalculator.employerSocialInsuranceFromWage(wage);
  const employerHealthInsurance = TaxCalculator.employerHealthInsuranceFromWage(wage);

  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(wage + employerSocialInsurance + employerHealthInsurance);
  const taxedIncome = wage - incomeTax - employeeSocialInsurance - employeeHealthInsurance;

  const nodes = [
    { name: 'Superhrubá mzda', color: '#1f77b4' },

    { name: 'Hrubá mzda', color: '#aec7e8' },
    { name: '' },
    { name: '' },

    { name: '' },
    { name: 'Daň z příjmu', color: '#ff9896' },
    { name: 'Sociální pojištění', color: '#ff7f0e' },
    { name: 'Zdravotní pojištění', color: '#ffbb78' },
    { name: 'Sociální pojištění z.', color: '#ff7f0e' },
    { name: 'Zdravotní pojištění z.', color: '#ffbb78' },

    { name: 'Čistá mzda', color: '#2ca02c' },
    { name: 'Daně', color: '#d62728' },
  ];
  const links = [
    { source: 0, target: 1, value: wage },
    { source: 0, target: 2, value: employerSocialInsurance },
    { source: 0, target: 3, value: employerHealthInsurance },

    { source: 1, target: 5, value: incomeTax },
    { source: 1, target: 6, value: employeeSocialInsurance },
    { source: 1, target: 7, value: employeeHealthInsurance },
    { source: 1, target: 4, value: taxedIncome },
    { source: 2, target: 8, value: employerSocialInsurance },
    { source: 3, target: 9, value: employerHealthInsurance },

    { source: 4, target: 10, value: taxedIncome },
    { source: 8, target: 11, value: employerSocialInsurance },
    { source: 9, target: 11, value: employerHealthInsurance },
    { source: 5, target: 11, value: incomeTax },
    { source: 6, target: 11, value: employeeSocialInsurance },
    { source: 7, target: 11, value: employeeHealthInsurance },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

EmployeeDiagram.propTypes = {
  income: React.PropTypes.number.isRequired,
};


export default EmployeeDiagram;
