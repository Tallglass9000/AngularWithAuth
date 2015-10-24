var mongoose = require('mongoose');

var beverageSchema = new mongoose.Schema({
  beverageBody: String,
  consumer: {type: String, default: 'Anonymous'}
});

module.exports = mongoose.model('Beverage', beverageSchema);