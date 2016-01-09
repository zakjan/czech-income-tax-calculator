'use strict';

import Immutable from 'immutable';

import { SET_INCOME, SET_EXPENSE, SET_FLAT_EXPENSE_RATIO } from './actionTypes.js';


const initialState = Immutable.Map({
  income: 1620000,
  expense: 100000,
  flatExpenseRatio: 0.6,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INCOME:
      return state.set('income', action.value);
    case SET_EXPENSE:
      return state.set('expense', action.value);
    case SET_FLAT_EXPENSE_RATIO:
      return state.set('flatExpenseRatio', action.value);
    default:
      return state;
  }
};


export default reducer;
