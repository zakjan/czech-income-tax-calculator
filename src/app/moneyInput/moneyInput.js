import React from 'react';
import PropTypes from 'prop-types';

import NumberInput from 'app/numberInput/numberInput.js';


const MoneyInput = props => {
  return (
    <span>
      <NumberInput value={props.value} onChange={props.onChange} />
      {' '}
      Kč
    </span>
  );
}

MoneyInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default MoneyInput;
