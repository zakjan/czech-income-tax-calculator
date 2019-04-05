import React from 'react';

import IncomeInput from 'app/incomeInput/incomeInput.js';
import NumberSelect from 'app/numberSelect/numberSelect.js';


const ContractorWithFlatExpensesForm = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Příjmy:</td>
          <td><IncomeInput value={props.income} onChange={props.setIncome} /></td>
        </tr>
        <tr>
          <td>Výdaje:</td>
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


export default ContractorWithFlatExpensesForm;
