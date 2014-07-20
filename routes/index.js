var Glass = require('../models/models');

module.exports.count = function(req, res, next) {
	var username = req.params.username;
	var lastDay = new Date(new Date() - 86400000);
	Glass.find({$and: [{timestamp: {$gte: lastDay }}, {username: username}]}, function(err, glasses) {
		if (err) res.status(500).json({'errorMessage': err});

		var results = {};
		for (var i = 0; i < glasses.length; i++) {
			results[i] = 'drank-' + i;
		}

		for (var i = glasses.length; i < 8; i++) {
			results[i] = 'empty';
		}
		res.render('glasses', {results: results, count: glasses.length});
	});
};

module.exports.add = function(req, res, next) {
	if (req.headers.host !== process.env.YO_HOST) {
		res.status(403).json({'sorry': 'Yo requests should only come from YO itself'});
	} else {
		var glass = new Glass({username: req.param('username'), timestamp: new Date()});
		glass.save(function(err, req) {
			if (err) console.log('unable to save Yo!');

			res.json({'message': 'cool!'});
		});
	}
};