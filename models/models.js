var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var glassSchema = new Schema({
	username: { type: String },
	timestamp: { type: Date }
});

module.exports = mongoose.model('Glass', glassSchema);