import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const ContractorDiagram = props => {
  const periodFactor = PeriodFactor[props.period];

  const income = props.income;
  const expense = props.expense;
  const flatExpenseRate = props.flatExpenseRate;

  const taxableExpense = TaxCalculator.taxableExpenseFromIncomeAndFlatExpenseRate(income, expense, flatExpenseRate);
  const taxedExpense = taxableExpense - expense;

  const taxableIncome = TaxCalculator.taxableIncomeFromIncomeAndExpense(income, taxableExpense);
  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(taxableIncome);
  const socialInsurance = TaxCalculator.socialInsuranceFromTaxableIncome(taxableIncome);
  const sicknessInsurance = props.sicknessInsurance ? TaxCalculator.sicknessInsuranceFromTaxableIncome(taxableIncome) : 0;
  const healthInsurance = TaxCalculator.healthInsuranceFromTaxableIncome(taxableIncome);
  const taxedIncome = taxableIncome - incomeTax - socialInsurance - sicknessInsurance - healthInsurance;

  
  const nodes = [
    { id: 0, name: 'Příjmy', color: '#1f77b4' },

    { id: 1, name: 'Uplatněné výdaje', color: '#aec7e8' },
    { id: 2, name: 'Zdanitelný základ', color: '#aec7e8' },

    { id: 3 },
    { id: 4 },
    { id: 5, name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 6, name: 'Sociální pojištění', color: '#ffbb78' },
    { id: 7, name: 'Nemocenské pojištění', color: '#ffbb78' },
    { id: 8, name: 'Zdravotní pojištění', color: '#ffbb78' },
    { id: 9 },

    { id: 10, name: 'Výdaje', color: '#d62728' },
    { id: 11, name: 'Daně', color: '#d62728' },
    { id: 12, name: 'Příjmy po zdanění', color: '#2ca02c' },
  ];
  const links = [
    { source: 0, target: 1, value: taxableExpense / periodFactor },
    { source: 0, target: 2, value: taxableIncome / periodFactor },

    { source: 1, target: 3, value: expense / periodFactor },
    { source: 1, target: 4, value: taxedExpense / periodFactor },
    { source: 2, target: 5, value: incomeTax / periodFactor },
    { source: 2, target: 6, value: socialInsurance / periodFactor },
    { source: 2, target: 7, value: sicknessInsurance / periodFactor },
    { source: 2, target: 8, value: healthInsurance / periodFactor },
    { source: 2, target: 9, value: taxedIncome / periodFactor },

    { source: 3, target: 10, value: expense / periodFactor },
    { source: 4, target: 12, value: taxedExpense / periodFactor },
    { source: 5, target: 11, value: incomeTax / periodFactor },
    { source: 6, target: 11, value: socialInsurance / periodFactor },
    { source: 7, target: 11, value: sicknessInsurance / periodFactor },
    { source: 8, target: 11, value: healthInsurance / periodFactor },
    { source: 9, target: 12, value: taxedIncome / periodFactor },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

ContractorDiagram.propTypes = {
  income: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
  flatExpenseRate: PropTypes.number.isRequired,
};


export default ContractorDiagram;
