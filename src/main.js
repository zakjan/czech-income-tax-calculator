import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import AppContainer from 'app/appContainer.js';
import store from 'services/store.js';

import './main.less';


// run!
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');

  ReactDOM.render(
    (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    ),
    el
  );
});
