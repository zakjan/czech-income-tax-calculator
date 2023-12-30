import React from 'react';
import PropTypes from 'prop-types';

import Period from 'models/period.js';


const AppForm = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Částky za období:</td>
          <td>
            <label>
              <input
                type="radio"
                name="period"
                value={Period.YEAR}
                checked={props.period === Period.YEAR}
                onChange={event => props.setPeriod(event.target.value)}
              />
              Kč / rok
            </label>
            
            <label>
              <input
                type="radio"
                name="period"
                value={Period.MONTH}
                checked={props.period === Period.MONTH}
                onChange={event => props.setPeriod(event.target.value)}
              />
              Kč / měsíc
            </label>
            
            <label>
              <input
                type="radio"
                name="period"
                value={Period.DAY}
                checked={props.period === Period.DAY}
                onChange={event => props.setPeriod(event.target.value)}
              />
              Kč / den
            </label>
            
            <label>
              <input
                type="radio"
                name="period"
                value={Period.HOUR}
                checked={props.period === Period.HOUR}
                onChange={event => props.setPeriod(event.target.value)}
              />
              Kč / hodina
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

AppForm.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
};


export default AppForm;
