import React from 'react';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import * as taxCalculator from 'services/taxCalculator.js';


const EmployeeDiagram = (props) => {
  const wage = props.income;

  const employeeSocialInsurance = taxCalculator.employeeSocialInsuranceFromWage(wage);
  const employeeHealthInsurance = taxCalculator.employeeHealthInsuranceFromWage(wage);
  const employerSocialInsurance = taxCalculator.employerSocialInsuranceFromWage(wage);
  const employerHealthInsurance = taxCalculator.employerHealthInsuranceFromWage(wage);

  const incomeTax = taxCalculator.incomeTaxFromTaxableIncome(wage + employerSocialInsurance + employerHealthInsurance);
  const taxedIncome = wage - employeeSocialInsurance - employeeHealthInsurance;

  const nodes = [
    { name: 'Superhrubá mzda' },

    { name: 'Daň z příjmu' },
    { name: 'Sociální pojištění' },
    { name: 'Zdravotní pojištění' },
    { name: 'Hrubá mzda' },

    { name: 'Sociální pojištění' },
    { name: 'Zdravotní pojištění' },
    { name: 'Čistá mzda' },

    { name: 'Daně' },
  ];
  const links = [
    { source: 0, target: 1, value: incomeTax },
    { source: 0, target: 2, value: employerSocialInsurance },
    { source: 0, target: 3, value: employerHealthInsurance },
    { source: 0, target: 4, value: wage },

    { source: 4, target: 5, value: employeeSocialInsurance },
    { source: 4, target: 6, value: employeeHealthInsurance },
    { source: 4, target: 7, value: taxedIncome },

    { source: 1, target: 8, value: incomeTax },
    { source: 2, target: 8, value: employerSocialInsurance },
    { source: 3, target: 8, value: employerHealthInsurance },
    { source: 5, target: 8, value: employeeSocialInsurance },
    { source: 6, target: 8, value: employeeHealthInsurance },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

EmployeeDiagram.propTypes = {
  income: React.PropTypes.number.isRequired,
};


export default EmployeeDiagram;
