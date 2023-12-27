import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import actionTypes from './actionTypes.js';
import TaxPayerType from 'models/taxPayerType.js';
import Period from 'models/period.js';


const savedState = JSON.parse(window.localStorage.getItem('state') || '{}');
const initialState = Immutable.Map({
  taxPayerType: savedState.taxPayerType || TaxPayerType.EMPLOYEE,
  period: savedState.period || Period.YEAR,
  income: savedState.income || 480000,
  benefit: savedState.benefit || 0,
  expense: savedState.expense || 0,
  flatExpenseRate: savedState.flatExpenseRate || 0.6,
});

const reducer = handleActions({
  [actionTypes.SET_TAX_PAYER_TYPE]: (state, action) => {
    const newState = state.set('taxPayerType', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_PERIOD]: (state, action) => {
    const newState = state.set('period', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_INCOME]: (state, action) => {
    const newState = state.set('income', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_BENEFIT]: (state, action) => {
    const newState = state.set('benefit', action.payload);
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
