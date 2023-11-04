import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import actionTypes from './actionTypes.js';
import TaxPayerType from 'models/taxPayerType.js';


const savedState = JSON.parse(window.localStorage.getItem('state') || '{}');
const initialState = Immutable.Map({
  taxPayerType: savedState.taxPayerType || TaxPayerType.EMPLOYEE,
  income: savedState.income || 480000,
  expense: savedState.expense || 300000,
  flatExpenseRate: savedState.flatExpenseRate || 0.6,
});

const reducer = handleActions({
  [actionTypes.SET_TAX_PAYER_TYPE]: (state, action) => {
    const newState = state.set('taxPayerType', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_INCOME]: (state, action) => {
    const newState = state.set('income', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_EXPENSE]: (state, action) => {
    const newState = state.set('expense', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_FLAT_EXPENSE_RATE]: (state, action) => {
    const newState = state.set('flatExpenseRate', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
}, initialState);


export default reducer;
