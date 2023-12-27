import { createAction } from 'redux-actions';

import actionTypes from './actionTypes.js';


const actions = {
  setTaxPayerType: createAction(actionTypes.SET_TAX_PAYER_TYPE),
  setPeriod: createAction(actionTypes.SET_PERIOD),
  setIncome: createAction(actionTypes.SET_INCOME),
  setBenefit: createAction(actionTypes.SET_BENEFIT),
  setExpense: createAction(actionTypes.SET_EXPENSE),
  setFlatExpenseRate: createAction(actionTypes.SET_FLAT_EXPENSE_RATE),
  setSicknessInsurance: createAction(actionTypes.SET_SICKNESS_INSURANCE),
};


export default actions;
