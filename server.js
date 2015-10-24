var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/beverages_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

app.use(express.static(__dirname + '/build'));

var beveragesRouter = require(__dirname + '/routes/beverages_routes');
var usersRouter = require(__dirname + '/routes/users_routes');
app.use('/api', beveragesRouter);
app.use('/api', usersRouter);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('server up on port: ' + port);
});