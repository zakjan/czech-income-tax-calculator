'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.js';

// common assets
require('./main.less');


// run!
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('root'));
});
