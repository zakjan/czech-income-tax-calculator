import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const EmployeeDiagram = props => {
  const periodFactor = PeriodFactor[props.period];

  const wage = props.income;
  const benefit = props.benefit;

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
    { id: 4, name: 'Benefity', color: '#aec7e8' },

    { id: 5 },
    { id: 6 },
    { id: 7, name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 8, name: 'Sociální pojištění zaměstnance', color: '#ffbb78' },
    { id: 9, name: 'Zdravotní pojištění zaměstnance', color: '#ffbb78' },
    { id: 10, name: 'Čistá mzda', color: '#aec7e8' },
    { id: 11 },

    { id: 12, name: 'Daně', color: '#d62728' },
    { id: 13, name: 'Příjmy po zdanění', color: '#2ca02c' },
  ];
  const links = [
    { source: 0, target: 1, value: employerSocialInsurance / periodFactor },
    { source: 0, target: 2, value: employerHealthInsurance / periodFactor },
    { source: 0, target: 3, value: wage / periodFactor },
    { source: 0, target: 4, value: benefit / periodFactor },

    { source: 1, target: 5, value: employerSocialInsurance / periodFactor },
    { source: 2, target: 6, value: employerHealthInsurance / periodFactor },
    { source: 3, target: 7, value: incomeTax / periodFactor },
    { source: 3, target: 8, value: employeeSocialInsurance / periodFactor },
    { source: 3, target: 9, value: employeeHealthInsurance / periodFactor },
    { source: 3, target: 10, value: taxedIncome / periodFactor },
    { source: 4, target: 11, value: benefit / periodFactor },

    { source: 5, target: 12, value: employerSocialInsurance / periodFactor },
    { source: 6, target: 12, value: employerHealthInsurance / periodFactor },
    { source: 7, target: 12, value: incomeTax / periodFactor },
    { source: 8, target: 12, value: employeeSocialInsurance / periodFactor },
    { source: 9, target: 12, value: employeeHealthInsurance / periodFactor },
    { source: 10, target: 13, value: taxedIncome / periodFactor },
    { source: 11, target: 13, value: benefit / periodFactor },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

EmployeeDiagram.propTypes = {
  income: PropTypes.number.isRequired,
};


export default EmployeeDiagram;
