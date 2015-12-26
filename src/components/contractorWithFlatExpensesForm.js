'use strict';

import React from 'react';


var ContractorWithFlatExpensesForm = React.createClass({
  render() {
    return (
      <div>
        <div>
          <label>Příjmy:</label>
          <input type="number" defaultValue="1620000" />
        </div>
        <div>
          <label>Výdaje:</label>
          <input type="number" defaultValue="100000" />
        </div>
        <div>
          <label>Procento paušálních výdajů:</label>
          <select defaultValue="0.6">
            <option value="0.4">40%</option>
            <option value="0.6">60%</option>
            <option value="0.8">80%</option>
          </select>
        </div>
      </div>
    );
  },
});


export default ContractorWithFlatExpensesForm;
