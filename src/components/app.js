'use strict';

import React from 'react';

import IncomeDiagram from './incomeDiagram.js';


var App = React.createClass({
  render() {
    return (
      <div>
        <h1>Kalkulačka čistého příjmu</h1>
        <IncomeDiagram />
      </div>
    );
  },
});


export default App;
