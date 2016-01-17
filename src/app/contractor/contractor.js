import React from 'react';

import ContractorDiagram from './contractorDiagram.js';


const Contractor = (props) => {
  return (
    <div>
      <h2>OSVČ</h2>
      <ContractorDiagram {...props} />
    </div>
  );
};


export default Contractor;
