import React from 'react';
import PropTypes from 'prop-types';

import MoneyInput from 'app/moneyInput/moneyInput.js';
import NumberSelect from 'app/numberSelect/numberSelect.js';


const ContractorForm = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Příjmy:</td>
          <td><MoneyInput period={props.period} value={props.grossIncome} onChange={props.setGrossIncome} /></td>
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

ContractorForm.propTypes = {
  grossIncome: PropTypes.number.isRequired,
  expense: PropTypes.number.isRequired,
  sicknessInsuranceEnabled: PropTypes.bool.isRequired,
  setGrossIncome: PropTypes.func.isRequired,
  setExpense: PropTypes.func.isRequired,
  setSicknessInsuranceEnabled: PropTypes.func.isRequired,
};


export default ContractorForm;
