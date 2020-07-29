import React from 'react';

import AppForm from 'app/appForm.js';
import TaxPayerTab from 'app/taxPayerTab/taxPayerTab.js';
import TaxCalculator from 'services/taxCalculator.js';

import './app.less';


const App = props => {
  return (
    <div className="app">
      <h1>Kalkulačka daně z příjmů za rok {TaxCalculator.getYear()}</h1>
      <AppForm {...props} />
      <TaxPayerTab {...props} />

      <p>
        <a className="github-button" href="https://github.com/zakjan/czech-income-tax-calculator" data-icon="octicon-star" data-show-count="true" aria-label="Star zakjan/czech-income-tax-calculator on GitHub">Star</a>
        {' '}
        <a className="github-button" href="https://github.com/sponsors/zakjan" data-icon="octicon-heart" aria-label="Sponsor @zakjan on GitHub">Sponsor</a>
      </p>
    </div>
  );
};


export default App;
