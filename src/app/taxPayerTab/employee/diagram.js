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
    { name: 'Superhrubá mzda' },

    { name: 'Sociální pojištění' },
    { name: 'Zdravotní pojištění' },
    { name: 'Hrubá mzda' },

    { name: 'Daň z příjmu' },
    { name: 'Sociální pojištění' },
    { name: 'Zdravotní pojištění' },
    { name: 'Čistá mzda' },

    { name: 'Daně' },
  ];
  const links = [
    { source: 0, target: 1, value: employerSocialInsurance },
    { source: 0, target: 2, value: employerHealthInsurance },
    { source: 0, target: 3, value: wage },

    { source: 3, target: 4, value: incomeTax },
    { source: 3, target: 5, value: employeeSocialInsurance },
    { source: 3, target: 6, value: employeeHealthInsurance },
    { source: 3, target: 7, value: taxedIncome },

    { source: 1, target: 8, value: employerSocialInsurance },
    { source: 2, target: 8, value: employerHealthInsurance },
    { source: 4, target: 8, value: incomeTax },
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
