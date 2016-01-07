'use strict';


const setIncome = (value) => {
  return {
    type: 'setIncome',
    value: value,
  };
};

const setExpense = (value) => {
  return {
    type: 'setExpense',
    value: value,
  };
};

const setFlatExpenseRatio = (value) => {
  return {
    type: 'setFlatExpenseRatio',
    value: value,
  };
};


export { setIncome, setExpense, setFlatExpenseRatio };
