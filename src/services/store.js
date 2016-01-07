'use strict';

import Immutable from 'immutable';
import { createStore } from 'redux';


var reducer = (state, action) => {
  if (state === undefined) {
    state = Immutable.Map({
      income: 1620000,
      expense: 100000,
      flatExpenseRatio: 0.6,
    });
  }

  console.log(action);

  switch (action.type) {
    case 'setIncome':
      return state.set('income', action.value);
    case 'setExpense':
      return state.set('expense', action.value);
    case 'setFlatExpenseRatio':
      return state.set('flatExpenseRatio', action.value);
    default:
      return state;
  }
};

var store = createStore(reducer)


export default store;
