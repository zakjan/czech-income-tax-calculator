import { createAction } from 'redux-actions';

import actionTypes from './actionTypes.js';


const actions = {
  setIncome: createAction(actionTypes.SET_INCOME),
  setExpense: createAction(actionTypes.SET_EXPENSE),
  setFlatExpenseRate: createAction(actionTypes.SET_FLAT_EXPENSE_RATE),
};


export default actions;
