import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const EmployeeDiagram = props => {
  const periodFactor = PeriodFactor[props.period];

  const wage = props.income;

  const employerSocialInsurance = TaxCalculator.employerSocialInsuranceFromWage(wage);
  const employerHealthInsurance = TaxCalculator.employerHealthInsuranceFromWage(wage);
  const employeeSocialInsurance = TaxCalculator.employeeSocialInsuranceFromWage(wage);
  const employeeHealthInsurance = TaxCalculator.employeeHealthInsuranceFromWage(wage);

  const taxableIncome = TaxCalculator.taxableIncomeFromWageAndEmployerInsurance(wage, employerSocialInsurance + employerHealthInsurance);

  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(taxableIncome);
  const taxedIncome = wage - incomeTax - employeeSocialInsurance - employeeHealthInsurance;

  const nodes = [
    { id: 0, name: 'Náklady zaměstnavatele', color: '#1f77b4' },

    { id: 1, name: 'Sociální pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 2, name: 'Zdravotní pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 3, name: 'Hrubá mzda', color: '#aec7e8' },

    { id: 4 },
    { id: 5 },
    { id: 6, name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 7, name: 'Sociální pojištění zaměstnance', color: '#ffbb78' },
    { id: 8, name: 'Zdravotní pojištění zaměstnance', color: '#ffbb78' },
    { id: 9 },

    { id: 10, name: 'Daně', color: '#d62728' },
    { id: 11, name: 'Čistá mzda', color: '#2ca02c' },
  ];
  const links = [
    { source: 0, target: 1, value: employerSocialInsurance / periodFactor },
    { source: 0, target: 2, value: employerHealthInsurance / periodFactor },
    { source: 0, target: 3, value: wage / periodFactor },

    { source: 1, target: 4, value: employerSocialInsurance / periodFactor },
    { source: 2, target: 5, value: employerHealthInsurance / periodFactor },
    { source: 3, target: 6, value: incomeTax / periodFactor },
    { source: 3, target: 7, value: employeeSocialInsurance / periodFactor },
    { source: 3, target: 8, value: employeeHealthInsurance / periodFactor },
    { source: 3, target: 9, value: taxedIncome / periodFactor },

    { source: 4, target: 10, value: employerSocialInsurance / periodFactor },
    { source: 5, target: 10, value: employerHealthInsurance / periodFactor },
    { source: 6, target: 10, value: incomeTax / periodFactor },
    { source: 7, target: 10, value: employeeSocialInsurance / periodFactor },
    { source: 8, target: 10, value: employeeHealthInsurance / periodFactor },
    { source: 9, target: 11, value: taxedIncome / periodFactor },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

EmployeeDiagram.propTypes = {
  income: PropTypes.number.isRequired,
};


export default EmployeeDiagram;
