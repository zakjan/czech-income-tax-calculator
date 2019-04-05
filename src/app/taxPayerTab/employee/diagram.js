import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';


const EmployeeDiagram = props => {
  const wage = props.income;

  const employeeSocialInsurance = TaxCalculator.employeeSocialInsuranceFromWage(wage);
  const employeeHealthInsurance = TaxCalculator.employeeHealthInsuranceFromWage(wage);
  const employerSocialInsurance = TaxCalculator.employerSocialInsuranceFromWage(wage);
  const employerHealthInsurance = TaxCalculator.employerHealthInsuranceFromWage(wage);

  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(wage + employerSocialInsurance + employerHealthInsurance);
  const taxedIncome = wage - incomeTax - employeeSocialInsurance - employeeHealthInsurance;

  const nodes = [
    { name: 'Superhrubá mzda', color: '#1f77b4' },

    { name: 'Sociální pojištění', color: '#ffbb78' },
    { name: 'Zdravotní pojištění', color: '#ffbb78' },
    { name: 'Hrubá mzda', color: '#aec7e8' },

    {},
    {},
    { name: 'Daň z příjmu', color: '#ffbb78' },
    { name: 'Sociální pojištění', color: '#ffbb78' },
    { name: 'Zdravotní pojištění', color: '#ffbb78' },
    {},

    { name: 'Daně', color: '#d62728' },
    { name: 'Čistá mzda', color: '#2ca02c' },
  ];
  const links = [
    { source: 0, target: 1, value: employerSocialInsurance },
    { source: 0, target: 2, value: employerHealthInsurance },
    { source: 0, target: 3, value: wage },

    { source: 1, target: 4, value: employerSocialInsurance },
    { source: 2, target: 5, value: employerHealthInsurance },
    { source: 3, target: 6, value: incomeTax },
    { source: 3, target: 7, value: employeeSocialInsurance },
    { source: 3, target: 8, value: employeeHealthInsurance },
    { source: 3, target: 9, value: taxedIncome },

    { source: 4, target: 10, value: employerSocialInsurance },
    { source: 5, target: 10, value: employerHealthInsurance },
    { source: 6, target: 10, value: incomeTax },
    { source: 7, target: 10, value: employeeSocialInsurance },
    { source: 8, target: 10, value: employeeHealthInsurance },
    { source: 9, target: 11, value: taxedIncome },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

EmployeeDiagram.propTypes = {
  income: PropTypes.number.isRequired,
};


export default EmployeeDiagram;
