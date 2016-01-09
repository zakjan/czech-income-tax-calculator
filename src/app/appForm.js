'use strict';

import React from 'react';

import IncomeInput from 'app/incomeInput/incomeInput.js';
import MoneyInput from 'app/moneyInput/moneyInput.js';
import NumberSelect from 'app/numberSelect/numberSelect.js';


const AppForm = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Příjmy:</td>
          <td><IncomeInput value={props.income} onChange={props.setIncome} /></td>
        </tr>
        <tr>
          <td>Výdaje:</td>
          <td><MoneyInput value={props.expense} onChange={props.setExpense} /></td>
        </tr>
        <tr>
          <td>Paušální výdaje:</td>
          <td>
            <NumberSelect value={props.flatExpenseRate} onChange={props.setFlatExpenseRate}>
              <option value="0.4">40%</option>
              <option value="0.6">60%</option>
              <option value="0.8">80%</option>
            </NumberSelect>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

AppForm.propTypes = {
  income: React.PropTypes.number.isRequired,
  expense: React.PropTypes.number.isRequired,
  flatExpenseRate: React.PropTypes.number.isRequired,
  setIncome: React.PropTypes.func.isRequired,
  setExpense: React.PropTypes.func.isRequired,
  setFlatExpenseRate: React.PropTypes.func.isRequired,
};


export default AppForm;
