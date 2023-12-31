import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import actionTypes from './actionTypes.js';
import Period from 'models/period.js';


const savedState = JSON.parse(window.localStorage.getItem('state') || '{}');
const initialState = Immutable.Map({
  period: savedState.period || Period.YEAR,
  employee: {
    grossSalary: savedState.employee?.grossSalary || 480000,
    benefitTaxExpense: savedState.employee?.benefitTaxExpense || 0,
    benefitNonTaxExpense: savedState.employee?.benefitNonTaxExpense || 0,
    unpaidDays: savedState.employee?.unpaidDays || 0,
  },
  contractor: {
    grossIncome: savedState.contractor?.grossIncome || 480000,
    expense: savedState.contractor?.expense || 0,
    flatExpenseRate: savedState.contractor?.flatExpenseRate || 0.6,
    sicknessInsuranceEnabled: savedState.contractor?.sicknessInsuranceEnabled || false,
    unpaidDays: savedState.contractor?.unpaidDays || 0,
  },
});

const reducer = handleActions({
  [actionTypes.SET_PERIOD]: (state, action) => {
    const newState = state.mergeDeep({ period: action.payload });
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_EMPLOYEE_GROSS_SALARY]: (state, action) => {
    const newState = state.mergeDeep({ employee: { grossSalary: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_EMPLOYEE_BENEFIT_TAX_DEDUCTIBLE_EXPENSE]: (state, action) => {
    const newState = state.mergeDeep({ employee: { benefitTaxExpense: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_EMPLOYEE_BENEFIT_NON_TAX_DEDUCTIBLE_EXPENSE]: (state, action) => {
    const newState = state.mergeDeep({ employee: { benefitNonTaxExpense: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_EMPLOYEE_UNPAID_DAYS]: (state, action) => {
    const newState = state.mergeDeep({ employee: { unpaidDays: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_CONTRACTOR_GROSS_INCOME]: (state, action) => {
    const newState = state.mergeDeep({ contractor: { grossIncome: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_CONTRACTOR_EXPENSE]: (state, action) => {
    const newState = state.mergeDeep({ contractor: { expense: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_CONTRACTOR_FLAT_EXPENSE_RATE]: (state, action) => {
    const newState = state.mergeDeep({ contractor: { flatExpenseRate: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_CONTRACTOR_SICKNESS_INSURANCE_ENABLED]: (state, action) => {
    const newState = state.mergeDeep({ contractor: { sicknessInsuranceEnabled: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
  [actionTypes.SET_CONTRACTOR_UNPAID_DAYS]: (state, action) => {
    const newState = state.mergeDeep({ contractor: { unpaidDays: action.payload }});
    window.localStorage.setItem('state', JSON.stringify(newState));
    return newState;
  },
}, initialState);


export default reducer;
