var express = require('express');

var port = process.env.PORT || 8080;

var app = express();
app.use(express.static('dist'));
app.listen(port);

console.log('Server listening on port ' + port);
