'use strict';

import d3Color from 'd3-color';
import d3Sankey from 'd3-sankey';
import d3Scale from 'd3-scale';
import d3Selection from 'd3-selection';
import d3Format from 'd3-format';
import React from 'react';

import SankeyDiagram from './sankeyDiagram.js';


const ContractorWithFlatExpensesDiagram = (props) => {
  const income = props.income;
  const expense = props.expense;
  const flatExpenseRatio = props.flatExpenseRatio;

  const flatExpense = income * flatExpenseRatio;
  const profit = income - flatExpense;

  const unusedFlatExpense = flatExpense - expense;
  const incomeTax = (profit * 0.15) - 24840;
  const socialInsurance = Math.max(profit / 2, 77652) * 0.292;
  const healthInsurance = Math.max(profit / 2, 155304) * 0.135;
  const taxedIncome = profit - incomeTax - socialInsurance - healthInsurance;

  const nodes = [
    { name: 'Příjmy' },

    { name: 'Paušální výdaje' },
    { name: 'Zisk' },

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
    { source: 0, target: 2, value: profit },

    { source: 2, target: 3, value: incomeTax },
    { source: 2, target: 4, value: socialInsurance },
    { source: 2, target: 5, value: healthInsurance },
    { source: 2, target: 6, value: taxedIncome },

    { source: 1, target: 7, value: expense },
    { source: 1, target: 9, value: unusedFlatExpense },

    { source: 3, target: 8, value: incomeTax },
    { source: 4, target: 8, value: socialInsurance },
    { source: 5, target: 8, value: healthInsurance },
    { source: 6, target: 9, value: taxedIncome },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

ContractorWithFlatExpensesDiagram.propTypes = {
  income: React.PropTypes.number.isRequired,
  expense: React.PropTypes.number.isRequired,
  flatExpenseRatio: React.PropTypes.number.isRequired,
};


export default ContractorWithFlatExpensesDiagram;
