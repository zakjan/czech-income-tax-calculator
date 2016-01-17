import Immutable from 'immutable';

import * as actionTypes from './actionTypes.js';


const initialState = Immutable.Map({
  income: 720000,
  expense: 100000,
  flatExpenseRate: 0.6,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INCOME:
      return state.set('income', action.value);
    case actionTypes.SET_EXPENSE:
      return state.set('expense', action.value);
    case actionTypes.SET_FLAT_EXPENSE_RATE:
      return state.set('flatExpenseRate', action.value);
    default:
      return state;
  }
};


export default reducer;
