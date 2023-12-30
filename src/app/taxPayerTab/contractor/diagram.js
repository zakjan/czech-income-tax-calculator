import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const ContractorDiagram = props => {
  const periodFactor = PeriodFactor[props.period];

  const grossIncome = props.grossIncome;
  const expense = props.expense;
  const flatExpenseRate = props.flatExpenseRate;
  const sicknessInsuranceEnabled = props.sicknessInsuranceEnabled;

  const applicableExpense = TaxCalculator.contractorApplicableExpenseFromGrossIncomeAndExpenseAndFlatExpenseRate(grossIncome, expense, flatExpenseRate);
  const virtualExpense = applicableExpense - expense;

  const incomeTaxableBase = TaxCalculator.contractorIncomeTaxableBaseFromGrossIncomeAndExpense(grossIncome, applicableExpense);
  const incomeTax = TaxCalculator.incomeTaxFromIncomeTaxableBase(incomeTaxableBase);
  const socialInsurance = TaxCalculator.contractorSocialInsuranceFromIncomeTaxableBase(incomeTaxableBase);
  const sicknessInsurance = TaxCalculator.contractorSicknessInsuranceFromIncomeTaxableBaseIfEnabled(incomeTaxableBase, sicknessInsuranceEnabled);
  const healthInsurance = TaxCalculator.contractorHealthInsuranceFromIncomeTaxableBase(incomeTaxableBase);
  const netIncome = incomeTaxableBase - incomeTax - socialInsurance - sicknessInsurance - healthInsurance;

  
  const nodes = [
    { id: 'grossIncome', name: 'Příjmy', color: '#1f77b4' },

    { id: 'applicableExpense', name: 'Uplatnitelné výdaje', color: '#aec7e8' },
    { id: 'incomeTaxableBase', name: 'Zdanitelný základ', color: '#aec7e8' },

    { id: 'expenseDummy' },
    { id: 'virtualExpenseDummy' },
    { id: 'incomeTax', name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 'socialInsurance', name: 'Sociální pojištění', color: '#ffbb78' },
    { id: 'sicknessInsurance', name: 'Nemocenské pojištění', color: '#ffbb78' },
    { id: 'healthInsurance', name: 'Zdravotní pojištění', color: '#ffbb78' },
    { id: 'netIncomeDummy' },

    { id: 'virtualExpense', name: 'Výdaje', color: '#d62728' },
    { id: 'taxes', name: 'Daně', color: '#d62728' },
    { id: 'netIncome', name: 'Příjmy po zdanění', color: '#2ca02c' },
  ];
  const links = [
    { source: 'grossIncome', target: 'applicableExpense', value: applicableExpense / periodFactor },
    { source: 'grossIncome', target: 'incomeTaxableBase', value: incomeTaxableBase / periodFactor },

    { source: 'applicableExpense', target: 'expenseDummy', value: expense / periodFactor },
    { source: 'applicableExpense', target: 'virtualExpenseDummy', value: virtualExpense / periodFactor },
    { source: 'incomeTaxableBase', target: 'incomeTax', value: incomeTax / periodFactor },
    { source: 'incomeTaxableBase', target: 'socialInsurance', value: socialInsurance / periodFactor },
    { source: 'incomeTaxableBase', target: 'sicknessInsurance', value: sicknessInsurance / periodFactor },
    { source: 'incomeTaxableBase', target: 'healthInsurance', value: healthInsurance / periodFactor },
    { source: 'incomeTaxableBase', target: 'netIncomeDummy', value: netIncome / periodFactor },

    { source: 'expenseDummy', target: 'virtualExpense', value: expense / periodFactor },
    { source: 'virtualExpenseDummy', target: 'netIncome', value: virtualExpense / periodFactor },
    { source: 'incomeTax', target: 'taxes', value: incomeTax / periodFactor },
    { source: 'socialInsurance', target: 'taxes', value: socialInsurance / periodFactor },
    { source: 'sicknessInsurance', target: 'taxes', value: sicknessInsurance / periodFactor },
    { source: 'healthInsurance', target: 'taxes', value: healthInsurance / periodFactor },
    { source: 'netIncomeDummy', target: 'netIncome', value: netIncome / periodFactor },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

ContractorDiagram.propTypes = {
  grossIncome: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
  flatExpenseRate: PropTypes.number.isRequired,
  sicknessInsuranceEnabled: PropTypes.bool.isRequired,
};


export default ContractorDiagram;
