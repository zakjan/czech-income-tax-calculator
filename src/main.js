'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './components/app.js';
import store from './services/store.js';

// common assets
require('./main.less');


// run!
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');

  ReactDOM.render(
    (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    el
  );
});
