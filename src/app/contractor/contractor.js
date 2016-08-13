import React from 'react';

import ContractorForm from './contractorForm.js';
import ContractorDiagram from './contractorDiagram.js';


const Contractor = (props) => {
  return (
    <div>
      <h2>OSVČ</h2>
      <ContractorForm {...props} />
      <ContractorDiagram {...props} />
    </div>
  );
};


export default Contractor;
