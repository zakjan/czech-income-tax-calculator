export const incomeTaxRate = 0.15;
export const socialInsuranceRate = 0.28;
export const healthInsuranceRate = 0.135;
export const employeeSocialInsuranceRate = 0.065;
export const employeeHealthInsuranceRate = 0.045;
export const employerSocialInsuranceRate = 0.25;
export const employerHealthInsuranceRate = 0.09;

export const incomeTaxDeductionForPayer = 24840;
export const minimalSocialInsuranceTaxableIncome = 77652;
export const minimalHealthInsuranceTaxableIncome = 155304;

export const taxableIncomeFromIncomeAndExpense = (income, expense) => Math.ceil(Math.max(income - expense, 0) / 100) * 100;
export const incomeTaxFromTaxableIncome = (taxableIncome) => Math.max(taxableIncome * incomeTaxRate - incomeTaxDeductionForPayer, 0);
export const socialInsuranceFromTaxableIncome = (taxableIncome) => Math.max(taxableIncome / 2, minimalSocialInsuranceTaxableIncome) * socialInsuranceRate;
export const healthInsuranceFromTaxableIncome = (taxableIncome) => Math.max(taxableIncome / 2, minimalHealthInsuranceTaxableIncome) * healthInsuranceRate;
export const employeeSocialInsuranceFromWage = (wage) => wage * employeeSocialInsuranceRate;
export const employeeHealthInsuranceFromWage = (wage) => wage * employeeHealthInsuranceRate;
export const employerSocialInsuranceFromWage = (wage) => wage * employerSocialInsuranceRate;
export const employerHealthInsuranceFromWage = (wage) => wage * employerHealthInsuranceRate;
