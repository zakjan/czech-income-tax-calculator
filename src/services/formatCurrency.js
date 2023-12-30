import * as d3Format from 'd3-format';
import d3FormatCsCzLocale from 'd3-format/locale/cs-CZ.json';

d3Format.formatDefaultLocale(d3FormatCsCzLocale);

const formatCurrency = d3Format.format('$,d');

export default formatCurrency;