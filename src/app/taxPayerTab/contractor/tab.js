import React from 'react';

import ContractorForm from './form.js';
import ContractorDiagram from './diagram.js';


const ContractorTab = props => {
  return (
    <div>
      <h2>OSVČ s paušálními výdaji</h2>
      <ContractorForm {...props} />
      <ContractorDiagram {...props} />
    </div>
  );
};


export default ContractorTab;
