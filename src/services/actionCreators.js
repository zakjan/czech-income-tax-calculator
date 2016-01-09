'use strict';

import * as actionTypes from './actionTypes.js';


export const setIncome = (value) => {
  return {
    type: actionTypes.SET_INCOME,
    value: value,
  };
};

export const setExpense = (value) => {
  return {
    type: actionTypes.SET_EXPENSE,
    value: value,
  };
};

export const setFlatExpenseRatio = (value) => {
  return {
    type: actionTypes.SET_FLAT_EXPENSE_RATIO,
    value: value,
  };
};
