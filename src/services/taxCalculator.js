const incomeTaxRate = 0.15;
const socialInsuranceRate = 0.28;
const healthInsuranceRate = 0.135;
const employeeSocialInsuranceRate = 0.065;
const employeeHealthInsuranceRate = 0.045;
const employerSocialInsuranceRate = 0.25;
const employerHealthInsuranceRate = 0.09;

const incomeTaxDeductionForPayer = 24840;
const minimalSocialInsuranceTaxableIncome = 77652;
const minimalHealthInsuranceTaxableIncome = 155304;

const TaxCalculator = {
  taxableIncomeFromIncomeAndExpense: (income, expense) => Math.ceil(Math.max(income - expense, 0) / 100) * 100,
  incomeTaxFromTaxableIncome: (taxableIncome) => Math.max(taxableIncome * incomeTaxRate - incomeTaxDeductionForPayer, 0),
  socialInsuranceFromTaxableIncome: (taxableIncome) => Math.max(taxableIncome / 2, minimalSocialInsuranceTaxableIncome) * socialInsuranceRate,
  healthInsuranceFromTaxableIncome: (taxableIncome) => Math.max(taxableIncome / 2, minimalHealthInsuranceTaxableIncome) * healthInsuranceRate,
  employeeSocialInsuranceFromWage: (wage) => wage * employeeSocialInsuranceRate,
  employeeHealthInsuranceFromWage: (wage) => wage * employeeHealthInsuranceRate,
  employerSocialInsuranceFromWage: (wage) => wage * employerSocialInsuranceRate,
  employerHealthInsuranceFromWage: (wage) => wage * employerHealthInsuranceRate,
};


export default TaxCalculator;
