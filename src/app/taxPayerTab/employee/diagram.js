import React from 'react';
import PropTypes from 'prop-types';

import SankeyDiagram from 'app/sankeyDiagram/sankeyDiagram.js';
import TaxCalculator from 'services/taxCalculator.js';
import PeriodFactor from 'models/periodFactor.js';


const EmployeeDiagram = props => {
  const { period, employee: { grossSalary, benefit, unpaidDays }} = props;
  const periodFactor = PeriodFactor[period];

  const activeGrossSalary = TaxCalculator.activeAmountWithoutUnpaidDays(grossSalary, unpaidDays);

  const employerIncomeTax = TaxCalculator.corporateIncomeTaxFromIncomeTaxableBase(benefit);
  const employerSocialInsurance = TaxCalculator.employerSocialInsuranceFromGrossSalary(activeGrossSalary);
  const employerHealthInsurance = TaxCalculator.employerHealthInsuranceFromGrossSalary(activeGrossSalary);

  const employeeIncomeTax = TaxCalculator.personalIncomeTaxFromIncomeTaxableBase(activeGrossSalary);
  const employeeSocialInsurance = TaxCalculator.employeeSocialInsuranceFromGrossSalary(activeGrossSalary);
  const employeeHealthInsurance = TaxCalculator.employeeHealthInsuranceFromGrossSalary(activeGrossSalary);
  const netSalary = activeGrossSalary - employeeIncomeTax - employeeSocialInsurance - employeeHealthInsurance;

  const nodes = [
    { id: 'employerApplicableExpense', name: 'Náklady zaměstnavatele', color: '#1f77b4' },

    { id: 'employerIncomeTax', name: 'Daň z příjmu zaměstnavatele', color: '#ffbb78' },
    { id: 'employerSocialInsurance', name: 'Sociální pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 'employerHealthInsurance', name: 'Zdravotní pojištění zaměstnavatele', color: '#ffbb78' },
    { id: 'grossSalary', name: 'Hrubá mzda', color: '#aec7e8' },
    { id: 'benefit', name: 'Benefity', color: '#aec7e8' },

    { id: 'employerIncomeTaxDummy' },
    { id: 'employerSocialInsuranceDummy' },
    { id: 'employerHealthInsuranceDummy' },
    { id: 'employeeIncomeTax', name: 'Daň z příjmu zaměstnance', color: '#ffbb78' },
    { id: 'employeeSocialInsurance', name: 'Sociální pojištění zaměstnance', color: '#ffbb78' },
    { id: 'employeeHealthInsurance', name: 'Zdravotní pojištění zaměstnance', color: '#ffbb78' },
    { id: 'netSalary', name: 'Čistá mzda', color: '#aec7e8' },
    { id: 'benefitDummy' },

    { id: 'taxes', name: 'Daně', color: '#d62728' },
    { id: 'netSalaryWithBenefit', name: 'Čisté příjmy', color: '#2ca02c' },
  ];
  const links = [
    { source: 'employerApplicableExpense', target: 'employerIncomeTax', value: employerIncomeTax / periodFactor },
    { source: 'employerApplicableExpense', target: 'employerSocialInsurance', value: employerSocialInsurance / periodFactor },
    { source: 'employerApplicableExpense', target: 'employerHealthInsurance', value: employerHealthInsurance / periodFactor },
    { source: 'employerApplicableExpense', target: 'grossSalary', value: activeGrossSalary / periodFactor },
    { source: 'employerApplicableExpense', target: 'benefit', value: benefit / periodFactor },

    { source: 'employerIncomeTax', target: 'employerIncomeTaxDummy', value: employerIncomeTax / periodFactor },
    { source: 'employerSocialInsurance', target: 'employerSocialInsuranceDummy', value: employerSocialInsurance / periodFactor },
    { source: 'employerHealthInsurance', target: 'employerHealthInsuranceDummy', value: employerHealthInsurance / periodFactor },
    { source: 'grossSalary', target: 'employeeIncomeTax', value: employeeIncomeTax / periodFactor },
    { source: 'grossSalary', target: 'employeeSocialInsurance', value: employeeSocialInsurance / periodFactor },
    { source: 'grossSalary', target: 'employeeHealthInsurance', value: employeeHealthInsurance / periodFactor },
    { source: 'grossSalary', target: 'netSalary', value: netSalary / periodFactor },
    { source: 'benefit', target: 'benefitDummy', value: benefit / periodFactor },

    { source: 'employerIncomeTaxDummy', target: 'taxes', value: employerIncomeTax / periodFactor },
    { source: 'employerSocialInsuranceDummy', target: 'taxes', value: employerSocialInsurance / periodFactor },
    { source: 'employerHealthInsuranceDummy', target: 'taxes', value: employerHealthInsurance / periodFactor },
    { source: 'employeeIncomeTax', target: 'taxes', value: employeeIncomeTax / periodFactor },
    { source: 'employeeSocialInsurance', target: 'taxes', value: employeeSocialInsurance / periodFactor },
    { source: 'employeeHealthInsurance', target: 'taxes', value: employeeHealthInsurance / periodFactor },
    { source: 'netSalary', target: 'netSalaryWithBenefit', value: netSalary / periodFactor },
    { source: 'benefitDummy', target: 'netSalaryWithBenefit', value: benefit / periodFactor },
  ];

  return (
    <SankeyDiagram nodes={nodes} links={links} />
  );
};

EmployeeDiagram.propTypes = {
  period: PropTypes.string.isRequired,
  employee: PropTypes.shape({
    grossSalary: PropTypes.number.isRequired,
    benefit: PropTypes.number.isRequired,
  }),
};


export default EmployeeDiagram;
