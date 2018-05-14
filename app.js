var express = require('express');
var app = express();
var db = require('./database');

var gpsController = require('./gps/gpsController');
app.use('/gps', gpsController);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


module.exports = app;
