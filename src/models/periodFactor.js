import Period from './period.js';


const MONTHS_PER_YEAR = 12;
const DAYS_PER_MONTH = 20;
const HOURS_PER_DAY = 8;

const PeriodFactor = {
  [Period.YEAR]: 1,
  [Period.MONTH]: 1 * MONTHS_PER_YEAR,
  [Period.DAY]: 1 * MONTHS_PER_YEAR * DAYS_PER_MONTH,
  [Period.HOUR]: 1 * MONTHS_PER_YEAR * DAYS_PER_MONTH * HOURS_PER_DAY,
};

export default PeriodFactor;
