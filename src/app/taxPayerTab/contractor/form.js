import React from 'react';
import PropTypes from 'prop-types';

import MoneyInput from 'app/moneyInput/moneyInput.js';
import NumberSelect from 'app/numberSelect/numberSelect.js';
import NumberInput from 'app/numberInput/numberInput.js';
import TaxCalculator from 'services/taxCalculator.js';
import formatCurrency from 'services/formatCurrency.js';


const ContractorForm = props => {
  const { period, contractor: { grossIncome, expense, flatExpenseRate, sicknessInsuranceEnabled, unpaidDays }} = props;

  const activeGrossIncome = TaxCalculator.activeAmountWithoutUnpaidDays(grossIncome, unpaidDays);

  return (
    <table>
      <tbody>
        <tr>
          <td width="150">Příjmy:</td>
          <td width="150"><MoneyInput period={period} value={grossIncome} onChange={props.setContractorGrossIncome} /></td>
          <td align="right">{formatCurrency(activeGrossIncome)} / rok</td>
        </tr>
        <tr>
          <td>Výdaje:</td>
          <td><MoneyInput period={period} value={expense} onChange={props.setContractorExpense} /></td>
          <td align="right">{formatCurrency(expense)} / rok</td>
        </tr>
        <tr>
          <td>Výdajový paušál:</td>
          <td>
            <NumberSelect value={flatExpenseRate} onChange={props.setContractorFlatExpenseRate}>
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
                checked={sicknessInsuranceEnabled}
                onChange={event => props.setContractorSicknessInsuranceEnabled(event.target.checked)}
              />
              Nemocenské pojištění
            </label>
          </td>
        </tr>
        <tr>
          <td>Neplacené volno:</td>
          <td><NumberInput value={unpaidDays} onChange={props.setContractorUnpaidDays} /> dnů / rok</td>
        </tr>
      </tbody>
    </table>
  );
};

ContractorForm.propTypes = {
  period: PropTypes.string.isRequired,
  contractor: PropTypes.shape({
    grossIncome: PropTypes.number.isRequired,
    expense: PropTypes.number.isRequired,
    sicknessInsuranceEnabled: PropTypes.bool.isRequired,
    unpaidDays: PropTypes.number.isRequired,
  }),
  setContractorGrossIncome: PropTypes.func.isRequired,
  setContractorExpense: PropTypes.func.isRequired,
  setContractorSicknessInsuranceEnabled: PropTypes.func.isRequired,
  setContractorUnpaidDays: PropTypes.func.isRequired,
};


export default ContractorForm;
