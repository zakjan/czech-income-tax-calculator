import { createAction } from 'redux-actions';

import actionTypes from './actionTypes.js';


const actions = {
  setPeriod: createAction(actionTypes.SET_PERIOD),
  setGrossSalary: createAction(actionTypes.SET_GROSS_SALARY),
  setBenefit: createAction(actionTypes.SET_BENEFIT),
  setGrossIncome: createAction(actionTypes.SET_GROSS_INCOME),
  setExpense: createAction(actionTypes.SET_EXPENSE),
  setFlatExpenseRate: createAction(actionTypes.SET_FLAT_EXPENSE_RATE),
  setSicknessInsuranceEnabled: createAction(actionTypes.SET_SICKNESS_INSURANCE_ENABLED),
};


export default actions;
