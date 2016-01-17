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

export const setFlatExpenseRate = (value) => {
  return {
    type: actionTypes.SET_FLAT_EXPENSE_RATE,
    value: value,
  };
};
