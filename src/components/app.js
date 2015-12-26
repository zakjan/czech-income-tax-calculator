'use strict';

import React from 'react';

import ContractorWithFlatExpenses from './contractorWithFlatExpenses.js';

require('./app.less');


var App = React.createClass({
  render() {
    return (
      <div className="app">
        <h1>Kalkulačka příjmů</h1>
        <ContractorWithFlatExpenses />
      </div>
    );
  },
});


export default App;
