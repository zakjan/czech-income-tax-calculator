import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';


const ContractorWithFlatExpensesDiagram = props => {
  const income = props.income;
  const expense = props.expense;
  const flatExpenseRate = props.flatExpenseRate;

  const flatExpense = TaxCalculator.flatExpenseFromIncomeAndFlatExpenseRate(income, flatExpenseRate);
  const effectiveFlatExpense = flatExpense - expense;

  const taxableIncome = TaxCalculator.taxableIncomeFromIncomeAndExpense(income, flatExpense);

  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(taxableIncome);
  const socialInsurance = TaxCalculator.socialInsuranceFromTaxableIncome(taxableIncome);
  const healthInsurance = TaxCalculator.healthInsuranceFromTaxableIncome(taxableIncome);
  const taxedIncome = taxableIncome - incomeTax - socialInsurance - healthInsurance;

  const nodes = [
    { id: 0, name: 'Příjmy', color: '#1f77b4' },

    { id: 1 },
    { id: 2, name: 'Výdajový paušál', color: '#aec7e8' },
    { id: 3, name: 'Zdanitelný základ', color: '#aec7e8' },

    { id: 4 },
    { id: 5 },
    { id: 6, name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 7, name: 'Sociální pojištění', color: '#ffbb78' },
    { id: 8, name: 'Zdravotní pojištění', color: '#ffbb78' },
    { id: 9 },

    { id: 10, name: 'Výdaje', color: '#d62728' },
    { id: 11, name: 'Daně', color: '#d62728' },
    { id: 12, name: 'Příjmy po zdanění', color: '#2ca02c' },
  ];
  const links = [
    { source: 0, target: 1, value: expense },
    { source: 0, target: 2, value: effectiveFlatExpense },
    { source: 0, target: 3, value: taxableIncome },

    { source: 1, target: 4, value: expense },
    { source: 2, target: 5, value: effectiveFlatExpense },
    { source: 3, target: 6, value: incomeTax },
    { source: 3, target: 7, value: socialInsurance },
    { source: 3, target: 8, value: healthInsurance },
    { source: 3, target: 9, value: taxedIncome },

    { source: 4, target: 10, value: expense },
    { source: 5, target: 12, value: effectiveFlatExpense },
    { source: 6, target: 11, value: incomeTax },
    { source: 7, target: 11, value: socialInsurance },
    { source: 8, target: 11, value: healthInsurance },
    { source: 9, target: 12, value: taxedIncome },
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
