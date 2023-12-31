import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const ContractorDiagram = props => {
  const { period, contractor: { grossIncome, expense, flatExpenseRate, sicknessInsuranceEnabled, unpaidDays }} = props;
  const periodFactor = PeriodFactor[period];

  const activeGrossIncome = TaxCalculator.activeAmountWithoutUnpaidDays(grossIncome, unpaidDays);
  
  const taxExpense = TaxCalculator.contractorTaxExpenseFromGrossIncomeAndExpenseAndFlatExpenseRate(activeGrossIncome, expense, flatExpenseRate);
  const virtualExpense = taxExpense - expense;

  const incomeTaxableBase = TaxCalculator.contractorIncomeTaxableBaseFromGrossIncomeAndExpense(activeGrossIncome, taxExpense);
  const incomeTax = TaxCalculator.personalIncomeTaxFromIncomeTaxableBase(incomeTaxableBase);
  const socialInsurance = TaxCalculator.contractorSocialInsuranceFromIncomeTaxableBase(incomeTaxableBase);
  const sicknessInsurance = TaxCalculator.contractorSicknessInsuranceFromIncomeTaxableBaseIfEnabled(incomeTaxableBase, sicknessInsuranceEnabled);
  const healthInsurance = TaxCalculator.contractorHealthInsuranceFromIncomeTaxableBase(incomeTaxableBase);
  const netIncome = incomeTaxableBase - incomeTax - socialInsurance - sicknessInsurance - healthInsurance;

  
  const nodes = [
    { id: 'grossIncome', name: 'Příjmy', color: '#1f77b4' },

    { id: 'taxExpense', name: 'Daňové náklady', color: '#aec7e8' },
    { id: 'incomeTaxableBase', name: 'Zdanitelný základ', color: '#aec7e8' },

    { id: 'expenseDummy' },
    { id: 'virtualExpenseDummy' },
    { id: 'incomeTax', name: 'Daň z příjmu', color: '#ffbb78' },
    { id: 'socialInsurance', name: 'Sociální pojištění', color: '#ffbb78' },
    { id: 'sicknessInsurance', name: 'Nemocenské pojištění', color: '#ffbb78' },
    { id: 'healthInsurance', name: 'Zdravotní pojištění', color: '#ffbb78' },
    { id: 'netIncomeDummy' },

    { id: 'expense', name: 'Výdaje', color: '#d62728' },
    { id: 'taxes', name: 'Daně', color: '#d62728' },
    { id: 'netIncome', name: 'Čisté příjmy', color: '#2ca02c' },
  ];
  const links = [
    { source: 'grossIncome', target: 'taxExpense', value: taxExpense / periodFactor },
    { source: 'grossIncome', target: 'incomeTaxableBase', value: incomeTaxableBase / periodFactor },

    { source: 'taxExpense', target: 'expenseDummy', value: expense / periodFactor },
    { source: 'taxExpense', target: 'virtualExpenseDummy', value: virtualExpense / periodFactor },
    { source: 'incomeTaxableBase', target: 'incomeTax', value: incomeTax / periodFactor },
    { source: 'incomeTaxableBase', target: 'socialInsurance', value: socialInsurance / periodFactor },
    { source: 'incomeTaxableBase', target: 'sicknessInsurance', value: sicknessInsurance / periodFactor },
    { source: 'incomeTaxableBase', target: 'healthInsurance', value: healthInsurance / periodFactor },
    { source: 'incomeTaxableBase', target: 'netIncomeDummy', value: netIncome / periodFactor },

    { source: 'expenseDummy', target: 'expense', value: expense / periodFactor },
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
  period: PropTypes.string.isRequired,
  contractor: PropTypes.shape({
    grossIncome: PropTypes.number.isRequired,
    expense: PropTypes.number.isRequired,
    sicknessInsuranceEnabled: PropTypes.bool.isRequired,
    unpaidDays: PropTypes.number.isRequired,
  }),
};


export default ContractorDiagram;
