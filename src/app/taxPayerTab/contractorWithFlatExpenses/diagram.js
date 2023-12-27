import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const ContractorWithFlatExpensesDiagram = props => {
  const periodFactor = PeriodFactor[props.period];

  const income = props.income;
  const expense = props.expense;
  const flatExpenseRate = props.flatExpenseRate;

  const flatExpense = TaxCalculator.flatExpenseFromIncomeAndFlatExpenseRate(income, flatExpenseRate);
  const effectiveFlatExpense = flatExpense - expense;

  const taxableIncome = TaxCalculator.taxableIncomeFromIncomeAndExpense(income, flatExpense);

  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(taxableIncome);
  const socialInsurance = TaxCalculator.socialInsuranceFromTaxableIncome(taxableIncome);
  const sicknessInsurance = props.sicknessInsurance ? TaxCalculator.sicknessInsuranceFromTaxableIncome(taxableIncome) : 0;
  const healthInsurance = TaxCalculator.healthInsuranceFromTaxableIncome(taxableIncome);
  const taxedIncome = taxableIncome - incomeTax - socialInsurance - sicknessInsurance - healthInsurance;

  const nodes = [
    { id: 0, name: 'Příjmy', color: '#1f77b4' },

    { id: 1 },
    { id: 2, name: 'Výdajový paušál', color: '#aec7e8' },
    { id: 3, name: 'Zdanitelný základ', color: '#aec7e8' },

    { id: 4 },
    { id: 5 },
    { id: 6, name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 7, name: 'Sociální pojištění', color: '#ffbb78' },
    { id: 8, name: 'Nemocenské pojištění', color: '#ffbb78' },
    { id: 9, name: 'Zdravotní pojištění', color: '#ffbb78' },
    { id: 10 },

    { id: 11, name: 'Výdaje', color: '#d62728' },
    { id: 12, name: 'Daně', color: '#d62728' },
    { id: 13, name: 'Příjmy po zdanění', color: '#2ca02c' },
  ];
  const links = [
    { source: 0, target: 1, value: expense / periodFactor },
    { source: 0, target: 2, value: effectiveFlatExpense / periodFactor },
    { source: 0, target: 3, value: taxableIncome / periodFactor },

    { source: 1, target: 4, value: expense / periodFactor },
    { source: 2, target: 5, value: effectiveFlatExpense / periodFactor },
    { source: 3, target: 6, value: incomeTax / periodFactor },
    { source: 3, target: 7, value: socialInsurance / periodFactor },
    { source: 3, target: 8, value: sicknessInsurance / periodFactor },
    { source: 3, target: 9, value: healthInsurance / periodFactor },
    { source: 3, target: 10, value: taxedIncome / periodFactor },

    { source: 4, target: 11, value: expense / periodFactor },
    { source: 5, target: 13, value: effectiveFlatExpense / periodFactor },
    { source: 6, target: 12, value: incomeTax / periodFactor },
    { source: 7, target: 12, value: socialInsurance / periodFactor },
    { source: 8, target: 12, value: sicknessInsurance / periodFactor },
    { source: 9, target: 12, value: healthInsurance / periodFactor },
    { source: 10, target: 13, value: taxedIncome / periodFactor },
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
