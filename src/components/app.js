'use strict';

import React from 'react';

import ContractorWithFlatExpenses from './contractorWithFlatExpenses.js';

import './app.less';


const App = (props) => {
  return (
    <div className="app">
      <h1>Kalkulačka příjmů</h1>
      <ContractorWithFlatExpenses {...props} />
    </div>
  );
};


export default App;
