import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';


const ContractorWithFlatExpensesDiagram = props => {
  const income = props.income;
  const flatExpenseRate = props.flatExpenseRate;
  const expense = TaxCalculator.expenseFromIncomeAndFlatExpenseRate(income, flatExpenseRate);

  const taxableIncome = TaxCalculator.taxableIncomeFromIncomeAndExpense(income, expense);

  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(taxableIncome);
  const socialInsurance = TaxCalculator.socialInsuranceFromTaxableIncome(taxableIncome);
  const healthInsurance = TaxCalculator.healthInsuranceFromTaxableIncome(taxableIncome);
  const taxedProfit = taxableIncome - incomeTax - socialInsurance - healthInsurance;

  const nodes = [
    { name: 'Příjmy', color: '#1f77b4' },

    {},
    { name: 'Zdanitelný základ', color: '#aec7e8' },

    {},
    { name: 'Daň z příjmu', color: '#ffbb78' },
    { name: 'Sociální pojištění', color: '#ffbb78' },
    { name: 'Zdravotní pojištění', color: '#ffbb78' },
    {},

    { name: 'Výdaje', color: '#ff7f0e' },
    { name: 'Daně', color: '#d62728' },
    { name: 'Zisk po zdanění', color: '#2ca02c' },
  ];
  const links = [
    { source: 0, target: 1, value: expense },
    { source: 0, target: 2, value: taxableIncome },

    { source: 1, target: 3, value: expense },
    { source: 2, target: 4, value: incomeTax },
    { source: 2, target: 5, value: socialInsurance },
    { source: 2, target: 6, value: healthInsurance },
    { source: 2, target: 7, value: taxedProfit },

    { source: 3, target: 8, value: expense },
    { source: 4, target: 9, value: incomeTax },
    { source: 5, target: 9, value: socialInsurance },
    { source: 6, target: 9, value: healthInsurance },
    { source: 7, target: 10, value: taxedProfit },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

ContractorWithFlatExpensesDiagram.propTypes = {
  income: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
  flatExpenseRate: PropTypes.number.isRequired,
};


export default ContractorWithFlatExpensesDiagram;
