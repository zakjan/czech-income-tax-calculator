import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import actionTypes from './actionTypes.js';


const initialState = Immutable.Map({
  income: 360000,
  expense: 50000,
  flatExpenseRate: 0.6,
});

const reducer = handleActions({
  [actionTypes.SET_INCOME]: (state, action) => {
    return state.set('income', action.payload);
  },
  [actionTypes.SET_EXPENSE]: (state, action) => {
    return state.set('expense', action.payload);
  },
  [actionTypes.SET_FLAT_EXPENSE_RATE]: (state, action) => {
    return state.set('flatExpenseRate', action.payload);
  },
}, initialState);


export default reducer;
