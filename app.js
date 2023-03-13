const express = require('express');

app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var routes = express.Router();

require('./routes')(routes); //Structure section

app.use(routes);

module.exports = { app }