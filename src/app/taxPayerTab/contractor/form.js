import React from 'react';

import MoneyInput from 'app/moneyInput/moneyInput.js';


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
      </tbody>
    </table>
  );
};


export default ContractorForm;
