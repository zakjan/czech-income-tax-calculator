import React from 'react';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import * as taxCalculator from 'services/taxCalculator.js';


const ContractorWithFlatExpensesDiagram = (props) => {
  const income = props.income;
  const expense = props.expense;
  const flatExpenseRate = props.flatExpenseRate;

  const flatExpense = income * flatExpenseRate;
  const taxableIncome = income - flatExpense;

  const unusedFlatExpense = flatExpense - expense;
  const incomeTax = taxCalculator.incomeTaxFromTaxableIncome(taxableIncome);
  const socialInsurance = taxCalculator.socialInsuranceFromTaxableIncome(taxableIncome);
  const healthInsurance = taxCalculator.healthInsuranceFromTaxableIncome(taxableIncome);
  const taxedProfit = taxableIncome - incomeTax - socialInsurance - healthInsurance;

  const nodes = [
    { name: 'Příjmy' },

    { name: 'Paušální výdaje' },
    { name: 'Zdanitelný základ' },

    { name: 'Daň z příjmu' },
    { name: 'Sociální pojištění' },
    { name: 'Zdravotní pojištění' },
    { name: 'Zisk po zdanění' },

    { name: 'Výdaje' },
    { name: 'Daně' },
    { name: 'Reálný zisk' },
  ];
  const links = [
    { source: 0, target: 1, value: flatExpense },
    { source: 0, target: 2, value: taxableIncome },

    { source: 2, target: 3, value: incomeTax },
    { source: 2, target: 4, value: socialInsurance },
    { source: 2, target: 5, value: healthInsurance },
    { source: 2, target: 6, value: taxedProfit },

    { source: 1, target: 7, value: expense },
    { source: 1, target: 9, value: unusedFlatExpense },

    { source: 3, target: 8, value: incomeTax },
    { source: 4, target: 8, value: socialInsurance },
    { source: 5, target: 8, value: healthInsurance },
    { source: 6, target: 9, value: taxedProfit },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

ContractorWithFlatExpensesDiagram.propTypes = {
  income: React.PropTypes.number.isRequired,
  expense: React.PropTypes.number.isRequired,
  flatExpenseRate: React.PropTypes.number.isRequired,
};


export default ContractorWithFlatExpensesDiagram;
