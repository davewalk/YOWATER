var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  path = require('path'),
  routes = require('./routes');

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/yowater';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function() {
    console.log('Couldn\'t create a connection to MongoDB. Is it running? Exiting now.');
    process.exit(1);
});

db.once('open', function() {
	console.log('connected to Mongo');

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/about', function(req, res, next) {
		res.render('about');
	});

	app.get('/api/water', routes.add);

	app.get('/api/glasses', function(req, res, next) {
		var username = req.query.q.toUpperCase();
		var hours = req.query.hours || '';
		res.redirect(301, '../' + username + '/' + hours);
	});

	app.get('/:username/:hours?', routes.count);

	app.get('/*', function(req, res, next) {
		res.render('index');
	});

	var port = Number(process.env.PORT || 5000);
	app.listen(port, function() {
	  console.log("Listening on " + port);
	});
});





