'use strict';

import d3Color from 'd3-color';
import d3Sankey from 'd3-sankey';
import d3Scale from 'd3-scale';
import d3Selection from 'd3-selection';
import d3Format from 'd3-format';
import React from 'react';

import SankeyDiagram from './sankeyDiagram.js';


var ContractorWithFlatExpensesDiagram = (props) => {
  var income = props.income;
  var expense = props.expense;
  var flatExpenseRatio = props.flatExpenseRatio;

  var flatExpense = income * flatExpenseRatio;
  var profit = income - flatExpense;

  var unusedFlatExpense = flatExpense - expense;
  var incomeTax = (profit * 0.15) - 24840;
  var socialInsurance = Math.max(profit / 2, 77652) * 0.292;
  var healthInsurance = Math.max(profit / 2, 155304) * 0.135;
  var taxedIncome = profit - incomeTax - socialInsurance - healthInsurance;

  var nodes = [
    { name: 'Příjmy' },

    { name: 'Paušální výdaje' },
    { name: 'Zisk' },

    { name: 'Výdaje' },
    { name: 'Daň z příjmu' },
    { name: 'Sociální pojištění' },
    { name: 'Zdravotní pojištění' },
    { name: 'Čistý zisk' },
  ];
  var links = [
    { source: 0, target: 1, value: flatExpense },
    { source: 0, target: 2, value: profit },

    { source: 1, target: 3, value: expense },
    { source: 1, target: 7, value: unusedFlatExpense },
    { source: 2, target: 4, value: incomeTax },
    { source: 2, target: 5, value: socialInsurance },
    { source: 2, target: 6, value: healthInsurance },
    { source: 2, target: 7, value: taxedIncome },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};


export default ContractorWithFlatExpensesDiagram;
