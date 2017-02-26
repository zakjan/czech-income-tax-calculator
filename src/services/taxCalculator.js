const maximalIncomeForFlatExpense = 2000000;
const incomeTaxRate = 0.15;
const incomeTaxDeductionForPayer = 24840;

const socialInsuranceRate = 0.28;
const employeeSocialInsuranceRate = 0.065;
const employerSocialInsuranceRate = 0.25;
const minimalSocialInsuranceTaxableIncome = 77652;
const maximalSocialInsuranceTaxableIncome = 1355136;

const healthInsuranceRate = 0.135;
const employeeHealthInsuranceRate = 0.045;
const employerHealthInsuranceRate = 0.09;
const minimalHealthInsuranceTaxableIncome = 155304;


const TaxCalculator = {
  expenseFromIncomeAndFlatExpenseRate: (income, flatExpenseRate) => {
    return Math.min(income, maximalIncomeForFlatExpense) * flatExpenseRate;
  },

  taxableIncomeFromIncomeAndExpense: (income, expense) => {
    return Math.floor(Math.max(income - expense, 0) / 100) * 100;
  },

  incomeTaxFromTaxableIncome: (taxableIncome) => {
    return Math.max(taxableIncome * incomeTaxRate - incomeTaxDeductionForPayer, 0);
  },

  socialInsuranceFromTaxableIncome: (taxableIncome) => {
    return Math.min(Math.max(taxableIncome / 2, minimalSocialInsuranceTaxableIncome), maximalSocialInsuranceTaxableIncome) * socialInsuranceRate;
  },

  healthInsuranceFromTaxableIncome: (taxableIncome) => {
    return Math.max(taxableIncome / 2, minimalHealthInsuranceTaxableIncome) * healthInsuranceRate;
  },

  employeeSocialInsuranceFromWage: (wage) => {
    return wage * employeeSocialInsuranceRate;
  },

  employeeHealthInsuranceFromWage: (wage) => {
    return wage * employeeHealthInsuranceRate;
  },

  employerSocialInsuranceFromWage: (wage) => {
    return wage * employerSocialInsuranceRate;
  },

  employerHealthInsuranceFromWage: (wage) => {
    return wage * employerHealthInsuranceRate;
  },
};


export default TaxCalculator;
