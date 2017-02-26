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
const maximalSocialInsuranceTaxableIncome = 1355136;


const TaxCalculator = {
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
