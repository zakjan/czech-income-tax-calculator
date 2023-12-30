import React from 'react';

import MoneyInput from 'app/moneyInput/moneyInput.js';
import NumberSelect from 'app/numberSelect/numberSelect.js';


const ContractorForm = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Příjmy:</td>
          <td><MoneyInput period={props.period} value={props.income} onChange={props.setIncome} /></td>
        </tr>
        <tr>
          <td>Výdaje:</td>
          <td><MoneyInput period={props.period} value={props.expense} onChange={props.setExpense} /></td>
        </tr>
        <tr>
          <td>Výdajový paušál:</td>
          <td>
            <NumberSelect value={props.flatExpenseRate} onChange={props.setFlatExpenseRate}>
              <option value="0">ne</option>
              <option value="0.4">40%</option>
              <option value="0.6">60%</option>
              <option value="0.8">80%</option>
            </NumberSelect>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <label>
              <input
                type="checkbox"
                checked={props.sicknessInsuranceEnabled}
                onChange={event => props.setSicknessInsuranceEnabled(event.target.checked)}
              />
              Nemocenské pojištění
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};


export default ContractorForm;
