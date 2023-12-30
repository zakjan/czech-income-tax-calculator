import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import actionTypes from './actionTypes.js';
import Period from 'models/period.js';


const savedState = JSON.parse(window.localStorage.getItem('state') || '{}');
const initialState = Immutable.Map({
  period: savedState.period || Period.YEAR,
  grossSalary: savedState.grossSalary || 480000,
  benefit: savedState.benefit || 0,
  grossIncome: savedState.grossIncome || 480000,
  expense: savedState.expense || 0,
  flatExpenseRate: savedState.flatExpenseRate || 0.6,
  sicknessInsuranceEnabled: savedState.sicknessInsuranceEnabled || false,
});

const reducer = handleActions({
  [actionTypes.SET_PERIOD]: (state, action) => {
    const newState = state.set('period', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_GROSS_SALARY]: (state, action) => {
    const newState = state.set('grossSalary', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_BENEFIT]: (state, action) => {
    const newState = state.set('benefit', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_GROSS_INCOME]: (state, action) => {
    const newState = state.set('grossIncome', action.payload);
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
  [actionTypes.SET_SICKNESS_INSURANCE_ENABLED]: (state, action) => {
    const newState = state.set('sicknessInsuranceEnabled', action.payload);
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
}, initialState);


export default reducer;
