'use strict';

import React from 'react';
import { connect } from 'react-redux'

import ContractorWithFlatExpenses from './contractorWithFlatExpenses.js';
import { setIncome, setExpense, setFlatExpenseRatio } from '../services/actions.js';

require('./app.less');


// Which part of the Redux global state does our component want to receive as props?
var mapStateToProps = (state) => {
  return {
    income: state.get('income'),
    expense: state.get('expense'),
    flatExpenseRatio: state.get('flatExpenseRatio'),
  };
};

// Which action creators does it want to receive by props?
var mapDispatchToProps = (dispatch) => {
  return {
    onChangeIncome: (value) => dispatch(setIncome(value)),
    onChangeExpense: (value) => dispatch(setExpense(value)),
    onChangeFlatExpenseRatio: (value) => dispatch(setFlatExpenseRatio(value)),
  };
};

var App = (props) => {
  return (
    <div className="app">
      <h1>Kalkulačka příjmů</h1>
      <ContractorWithFlatExpenses
        income={props.income}
        expense={props.expense}
        flatExpenseRatio={props.flatExpenseRatio}
        onChangeIncome={props.onChangeIncome}
        onChangeExpense={props.onChangeExpense}
        onChangeFlatExpenseRatio={props.onChangeFlatExpenseRatio}
      />
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
