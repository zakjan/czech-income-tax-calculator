import { createAction } from 'redux-actions';

import actionTypes from './actionTypes.js';


const actions = {
  setPeriod: createAction(actionTypes.SET_PERIOD),
  setEmployeeGrossSalary: createAction(actionTypes.SET_EMPLOYEE_GROSS_SALARY),
  setEmployeeBenefitTaxExpense: createAction(actionTypes.SET_EMPLOYEE_BENEFIT_TAX_DEDUCTIBLE_EXPENSE),
  setEmployeeBenefitNonTaxExpense: createAction(actionTypes.SET_EMPLOYEE_BENEFIT_NON_TAX_DEDUCTIBLE_EXPENSE),
  setEmployeeUnpaidDays: createAction(actionTypes.SET_EMPLOYEE_UNPAID_DAYS),
  setContractorGrossIncome: createAction(actionTypes.SET_CONTRACTOR_GROSS_INCOME),
  setContractorExpense: createAction(actionTypes.SET_CONTRACTOR_EXPENSE),
  setContractorFlatExpenseRate: createAction(actionTypes.SET_CONTRACTOR_FLAT_EXPENSE_RATE),
  setContractorSicknessInsuranceEnabled: createAction(actionTypes.SET_CONTRACTOR_SICKNESS_INSURANCE_ENABLED),
  setContractorUnpaidDays: createAction(actionTypes.SET_CONTRACTOR_UNPAID_DAYS),
};


export default actions;
