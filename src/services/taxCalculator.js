const incomeTaxRate = 0.15;
const incomeTaxRateZone2 = 0.23;
const incomeTaxDeductionForPayer = 30840;
const incomeThresholdZone2 = 131901 * 12; // https://www.mfcr.cz/cs/ministerstvo/media/tiskove-zpravy/2023/prehledne-ktere-zmeny-prinese-rok-2024-nejen-pro-o-54178

const contractorMaximalIncomeForFlatExpense = 2000000;
const contractorSocialInsuranceRate = 0.292; // excluding sickness insurance
const contractorSicknessInsuranceRate = 0.027;
const contractorHealthInsuranceRate = 0.135;
const contractorMinimalSocialInsuranceTaxableIncome = 13191 * 12; // minimální roční vyměřovací základ, https://www.cssz.cz/vyse-minimalnich-vymerovacich-zakladu-osvc
const contractorMaximalSocialInsuranceTaxableIncome = 2110416; // maximální roční vyměřovací základ, https://www.mpsv.cz/socialni-pojisteni
const contractorMinimalSicknessInsuranceTaxableIncome = 8000 * 12; // minimální roční vyměřovací základ, https://www.cssz.cz/web/cz/vyse-a-vypocet-davek
const contractorMinimalHealthInsuranceTaxableIncome = 21983.50 * 12; // minimální roční vyměřovací základ, https://www.vzp.cz/platci/informace/osvc/vymerovaci-zaklad-a-vypocet-pojistneho/jaky-je-minimalni-vymerovaci-zaklad

const employerSocialInsuranceRate = 0.248; // including sickness insurance
const employerHealthInsuranceRate = 0.09;

const employeeSocialInsuranceRate = 0.071; // including sickness insurance
const employeeHealthInsuranceRate = 0.045;


const TaxCalculator = {
  getYear: () => {
    return 2024;
  },

  contractorTaxableExpenseFromIncomeAndExpenseAndFlatExpenseRate: (income, expense, flatExpenseRate) => {
    return Math.max(expense, Math.min(income, contractorMaximalIncomeForFlatExpense) * flatExpenseRate);
  },

  contractorTaxableIncomeFromIncomeAndExpense: (income, expense) => {
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

  contractorSocialInsuranceFromTaxableIncome: taxableIncome => {
    const socialInsuranceTaxableBase = Math.max(Math.min(taxableIncome / 2, contractorMaximalSocialInsuranceTaxableIncome), contractorMinimalSocialInsuranceTaxableIncome);
    return socialInsuranceTaxableBase * contractorSocialInsuranceRate;
  },

  contractorSicknessInsuranceFromTaxableIncomeIfEnabled: (taxableIncome, sicknessInsuranceEnabled) => {
    const sicknessInsuranceTaxableBase = Math.max(taxableIncome / 2, contractorMinimalSicknessInsuranceTaxableIncome);
    return sicknessInsuranceEnabled ? sicknessInsuranceTaxableBase * contractorSicknessInsuranceRate : 0;
  },

  contractorHealthInsuranceFromTaxableIncome: taxableIncome => {
    const healthInsuranceTaxableBase = Math.max(taxableIncome / 2, contractorMinimalHealthInsuranceTaxableIncome);
    return healthInsuranceTaxableBase * contractorHealthInsuranceRate;
  },

  employeeSocialInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employeeSocialInsuranceRate;
  },

  employeeHealthInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employeeHealthInsuranceRate;
  },

  employerSocialInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employerSocialInsuranceRate;
  },

  employerHealthInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employerHealthInsuranceRate;
  },
};


export default TaxCalculator;
