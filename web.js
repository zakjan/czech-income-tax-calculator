var express = require('express');

var port = process.env.PORT || 8080;

var app = express();
app.use((req, res, next) => {
  var host = req.get('Host');
  if (host === 'czech-income-tax-calculator.zakjan.cz') {
    return res.redirect(301, 'http://tax.zakjan.cz/' + req.originalUrl);
  }
  return next();
});
app.use(express.static('dist'));
app.listen(port);

console.log('Server listening on port ' + port);
