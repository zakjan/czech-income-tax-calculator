import Period from '../models/period.js';
import PeriodFactor from '../models/periodFactor.js';

const personalIncomeTaxRate = 0.15;
const personalIncomeTaxRateZone2 = 0.23;
const personalIncomeTaxDeductionForPayer = 30840;
const personalIncomeTaxThresholdZone2 = 131901 * 12; // https://www.mfcr.cz/cs/ministerstvo/media/tiskove-zpravy/2023/prehledne-ktere-zmeny-prinese-rok-2024-nejen-pro-o-54178

const corporateIncomeTaxRate = 0.21;

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

  activeAmountWithoutUnpaidDays: (amount, unpaidDays) => {
    return Math.max(amount * ((PeriodFactor[Period.DAY] - unpaidDays) / PeriodFactor[Period.DAY]), 0);
  },

  contractorTaxExpenseFromGrossIncomeAndExpenseAndFlatExpenseRate: (grossIncome, expense, flatExpenseRate) => {
    return Math.max(expense, Math.min(grossIncome, contractorMaximalIncomeForFlatExpense) * flatExpenseRate);
  },

  contractorIncomeTaxableBaseFromGrossIncomeAndExpense: (grossIncome, expense) => {
    return Math.max(grossIncome - expense, 0);
  },

  personalIncomeTaxFromIncomeTaxableBase: incomeTaxableBase => {
    const roundedIncomeTaxableBase = Math.floor(incomeTaxableBase / 100) * 100;
    const deductions = personalIncomeTaxDeductionForPayer;
    const incomeTaxZone1 = Math.min(roundedIncomeTaxableBase, personalIncomeTaxThresholdZone2) * personalIncomeTaxRate;
    const incomeTaxZone2 = Math.max(roundedIncomeTaxableBase - personalIncomeTaxThresholdZone2, 0) * personalIncomeTaxRateZone2;
    const incomeTax = incomeTaxZone1 + incomeTaxZone2;
    return Math.max(incomeTax - deductions, 0);
  },

  corporateIncomeTaxFromIncomeTaxableBase: incomeTaxableBase => {
    return incomeTaxableBase * corporateIncomeTaxRate;
  },

  contractorSocialInsuranceFromIncomeTaxableBase: incomeTaxableBase => {
    const socialInsuranceTaxableBase = Math.max(Math.min(incomeTaxableBase * 0.55, contractorMaximalSocialInsuranceTaxableIncome), contractorMinimalSocialInsuranceTaxableIncome);
    return socialInsuranceTaxableBase * contractorSocialInsuranceRate;
  },

  contractorSicknessInsuranceFromIncomeTaxableBaseIfEnabled: (incomeTaxableBase, sicknessInsuranceEnabled) => {
    const sicknessInsuranceTaxableBase = Math.max(incomeTaxableBase * 0.55, contractorMinimalSicknessInsuranceTaxableIncome);
    return sicknessInsuranceEnabled ? sicknessInsuranceTaxableBase * contractorSicknessInsuranceRate : 0;
  },

  contractorHealthInsuranceFromIncomeTaxableBase: incomeTaxableBase => {
    const healthInsuranceTaxableBase = Math.max(incomeTaxableBase * 0.5, contractorMinimalHealthInsuranceTaxableIncome);
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
