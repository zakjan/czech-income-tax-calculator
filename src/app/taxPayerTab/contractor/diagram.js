import React from 'react';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';


const ContractorDiagram = (props) => {
  const income = props.income;
  const expense = props.expense;

  const taxableIncome = TaxCalculator.taxableIncomeFromIncomeAndExpense(income, expense);

  const incomeTax = TaxCalculator.incomeTaxFromTaxableIncome(taxableIncome);
  const socialInsurance = TaxCalculator.socialInsuranceFromTaxableIncome(taxableIncome);
  const healthInsurance = TaxCalculator.healthInsuranceFromTaxableIncome(taxableIncome);
  const taxedProfit = taxableIncome - incomeTax - socialInsurance - healthInsurance;

  const nodes = [
    { name: 'Příjmy' },

    { name: 'Výdaje' },
    { name: 'Zdanitelný základ' },

    { name: 'Daň z příjmu' },
    { name: 'Sociální pojištění' },
    { name: 'Zdravotní pojištění' },

    { name: 'Daně' },
    { name: 'Zisk po zdanění' },
  ];
  const links = [
    { source: 0, target: 1, value: expense },
    { source: 0, target: 2, value: taxableIncome },

    { source: 2, target: 3, value: incomeTax },
    { source: 2, target: 4, value: socialInsurance },
    { source: 2, target: 5, value: healthInsurance },

    { source: 3, target: 6, value: incomeTax },
    { source: 4, target: 6, value: socialInsurance },
    { source: 5, target: 6, value: healthInsurance },
    { source: 2, target: 7, value: taxedProfit },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

ContractorDiagram.propTypes = {
  income: React.PropTypes.number.isRequired,
  expense: React.PropTypes.number.isRequired,
};


export default ContractorDiagram;
