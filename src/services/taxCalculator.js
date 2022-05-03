const maximalIncomeForFlatExpense = 2000000;
const incomeTaxRate = 0.15;
const incomeTaxRateZone2 = 0.22;
const incomeTaxDeductionForPayer = 30840;

const socialInsuranceRate = 0.292;
const employeeSocialInsuranceRate = 0.065;
const employerSocialInsuranceRate = 0.248;
const minimalSocialInsuranceTaxableIncome = 116736; // minimální roční vyměřovací základ, https://www.cssz.cz/vyse-minimalnich-vymerovacich-zakladu-osvc
const maximalSocialInsuranceTaxableIncome = 1867728; // maximální roční vyměřovací základ, https://www.mpsv.cz/socialni-pojisteni

const healthInsuranceRate = 0.135;
const employeeHealthInsuranceRate = 0.045;
const employerHealthInsuranceRate = 0.09;
const minimalHealthInsuranceTaxableIncome = 233466; // minimální roční vyměřovací základ, https://www.vzp.cz/platci/informace/osvc/vymerovaci-zaklad-a-vypocet-pojistneho/jaky-je-minimalni-vymerovaci-zaklad

const incomeThresholdZone2 = maximalSocialInsuranceTaxableIncome;


const TaxCalculator = {
  getYear: () => {
    return 2022;
  },

  expenseFromIncomeAndFlatExpenseRate: (income, flatExpenseRate) => {
    return Math.min(income, maximalIncomeForFlatExpense) * flatExpenseRate;
  },

  taxableIncomeFromIncomeAndExpense: (income, expense) => {
    return Math.max(income - expense, 0);
  },

  incomeTaxFromTaxableIncome: taxableIncome => {
    const roundedTaxableIncome = Math.floor(taxableIncome / 100) * 100;
    const deductions = incomeTaxDeductionForPayer;
    const incomeTaxZone1 = Math.min(roundedTaxableIncome, incomeThresholdZone2) * incomeTaxRate;
    const incomeTaxZone2 = Math.max(roundedTaxableIncome - incomeThresholdZone2, 0) * incomeTaxRateZone2;
    const incomeTax = incomeTaxZone1 + incomeTaxZone2;
    return Math.max(incomeTax - deductions, 0);
  },

  socialInsuranceFromTaxableIncome: taxableIncome => {
    const socialInsuranceTaxableBase = Math.max(Math.min(taxableIncome / 2, maximalSocialInsuranceTaxableIncome), minimalSocialInsuranceTaxableIncome);
    return socialInsuranceTaxableBase * socialInsuranceRate;
  },

  healthInsuranceFromTaxableIncome: taxableIncome => {
    const healthInsuranceTaxableBase = Math.max(taxableIncome / 2, minimalHealthInsuranceTaxableIncome);
    return healthInsuranceTaxableBase * healthInsuranceRate;
  },

  taxableIncomeFromWageAndEmployerInsurance: (wage, employerInsurance) => {
    // return wage + employerInsurance; // superhrubá mzda zrušena od 2021
    return wage;
  },

  employeeSocialInsuranceFromWage: wage => {
    return wage * employeeSocialInsuranceRate;
  },

  employeeHealthInsuranceFromWage: wage => {
    return wage * employeeHealthInsuranceRate;
  },

  employerSocialInsuranceFromWage: wage => {
    return wage * employerSocialInsuranceRate;
  },

  employerHealthInsuranceFromWage: wage => {
    return wage * employerHealthInsuranceRate;
  },
};


export default TaxCalculator;
