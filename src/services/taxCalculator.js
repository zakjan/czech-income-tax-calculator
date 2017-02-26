const maximalIncomeForFlatExpense = 2000000;
const incomeTaxRate = 0.15;
const incomeThresholdZone2 = 1296288;
const incomeTaxRateZone2 = 0.22;
const incomeTaxDeductionForPayer = 24840;

const socialInsuranceRate = 0.28;
const employeeSocialInsuranceRate = 0.065;
const employerSocialInsuranceRate = 0.25;
const minimalSocialInsuranceTaxableIncome = 77652;
const maximalSocialInsuranceTaxableIncome = 1296288;

const healthInsuranceRate = 0.135;
const employeeHealthInsuranceRate = 0.045;
const employerHealthInsuranceRate = 0.09;
const minimalHealthInsuranceTaxableIncome = 155304;


const TaxCalculator = {
  getYear: () => {
    return 2016;
  },

  expenseFromIncomeAndFlatExpenseRate: (income, flatExpenseRate) => {
    return Math.min(income, maximalIncomeForFlatExpense) * flatExpenseRate;
  },

  taxableIncomeFromIncomeAndExpense: (income, expense) => {
    const taxableIncome = Math.max(income - expense, 0);
    return Math.floor(taxableIncome / 100) * 100;
  },

  incomeTaxFromTaxableIncome: (taxableIncome) => {
    const deductions = incomeTaxDeductionForPayer;
    const incomeTaxZone1 = Math.min(taxableIncome, incomeThresholdZone2) * incomeTaxRate;
    const incomeTaxZone2 = Math.max(taxableIncome - incomeThresholdZone2, 0) * incomeTaxRateZone2;
    const incomeTax = incomeTaxZone1 + incomeTaxZone2;
    return Math.max(incomeTax - deductions, 0);
  },

  socialInsuranceFromTaxableIncome: (taxableIncome) => {
    const socialInsuranceTaxableBase = Math.max(Math.min(taxableIncome / 2, maximalSocialInsuranceTaxableIncome), minimalSocialInsuranceTaxableIncome);
    return socialInsuranceTaxableBase * socialInsuranceRate;
  },

  healthInsuranceFromTaxableIncome: (taxableIncome) => {
    const healthInsuranceTaxableBase = Math.max(taxableIncome / 2, minimalHealthInsuranceTaxableIncome);
    return healthInsuranceTaxableBase * healthInsuranceRate;
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
