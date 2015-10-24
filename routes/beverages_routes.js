var Beverage = require(__dirname + '/../models/beverage');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var beveragesRoute = module.exports = exports = express.Router();

beveragesRoute.get('/beverages', jsonParser, eatAuth, function (req, res) {
  Beverage.find({consumer: req.user.username}, function (err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

beveragesRoute.post('/beverages', jsonParser, eatAuth, function (req, res) {
  var newBeverage = new Beverage(req.body);
  newBeverage.consumer = req.user.username;
  newBeverage.save(function (err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

beveragesRoute.put('/beverages/:id', jsonParser, eatAuth, function (req, res) {
  var newBeverageBody = req.body;
  delete newBeverageBody._id;
  Beverage.update({_id: req.params.id}, newBeverageBody, function (err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

beveragesRoute.delete('/beverages/:id', jsonParser, eatAuth, function (req, res) {
  Beverage.remove({_id: req.params.id}, function (err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});