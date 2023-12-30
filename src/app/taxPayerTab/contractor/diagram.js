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

  const taxableExpense = TaxCalculator.taxableExpenseFromIncomeAndExpenseAndFlatExpenseRate(income, expense, flatExpenseRate);
  const taxedExpense = taxableExpense - expense;

  const taxableIncome = TaxCalculator.taxableIncomeFromIncomeAndExpense(income, taxableExpense);
  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(taxableIncome);
  const socialInsurance = TaxCalculator.socialInsuranceFromTaxableIncome(taxableIncome);
  const sicknessInsurance = props.sicknessInsurance ? TaxCalculator.sicknessInsuranceFromTaxableIncome(taxableIncome) : 0;
  const healthInsurance = TaxCalculator.healthInsuranceFromTaxableIncome(taxableIncome);
  const taxedIncome = taxableIncome - incomeTax - socialInsurance - sicknessInsurance - healthInsurance;

  
  const nodes = [
    { id: 'income', name: 'Příjmy', color: '#1f77b4' },

    { id: 'taxableExpense', name: 'Uplatněné výdaje', color: '#aec7e8' },
    { id: 'taxableIncome', name: 'Zdanitelný základ', color: '#aec7e8' },

    { id: 'expenseDummy' },
    { id: 'taxedExpenseDummy' },
    { id: 'incomeTax', name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 'socialInsurance', name: 'Sociální pojištění', color: '#ffbb78' },
    { id: 'sicknessInsurance', name: 'Nemocenské pojištění', color: '#ffbb78' },
    { id: 'healthInsurance', name: 'Zdravotní pojištění', color: '#ffbb78' },
    { id: 'taxedIncomeDummy' },

    { id: 'taxedExpense', name: 'Výdaje', color: '#d62728' },
    { id: 'taxes', name: 'Daně', color: '#d62728' },
    { id: 'taxedIncome', name: 'Příjmy po zdanění', color: '#2ca02c' },
  ];
  const links = [
    { source: 'income', target: 'taxableExpense', value: taxableExpense / periodFactor },
    { source: 'income', target: 'taxableIncome', value: taxableIncome / periodFactor },

    { source: 'taxableExpense', target: 'expenseDummy', value: expense / periodFactor },
    { source: 'taxableExpense', target: 'taxedExpenseDummy', value: taxedExpense / periodFactor },
    { source: 'taxableIncome', target: 'incomeTax', value: incomeTax / periodFactor },
    { source: 'taxableIncome', target: 'socialInsurance', value: socialInsurance / periodFactor },
    { source: 'taxableIncome', target: 'sicknessInsurance', value: sicknessInsurance / periodFactor },
    { source: 'taxableIncome', target: 'healthInsurance', value: healthInsurance / periodFactor },
    { source: 'taxableIncome', target: 'taxedIncomeDummy', value: taxedIncome / periodFactor },

    { source: 'expenseDummy', target: 'taxedExpense', value: expense / periodFactor },
    { source: 'taxedExpenseDummy', target: 'taxedIncome', value: taxedExpense / periodFactor },
    { source: 'incomeTax', target: 'taxes', value: incomeTax / periodFactor },
    { source: 'socialInsurance', target: 'taxes', value: socialInsurance / periodFactor },
    { source: 'sicknessInsurance', target: 'taxes', value: sicknessInsurance / periodFactor },
    { source: 'healthInsurance', target: 'taxes', value: healthInsurance / periodFactor },
    { source: 'taxedIncomeDummy', target: 'taxedIncome', value: taxedIncome / periodFactor },
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
