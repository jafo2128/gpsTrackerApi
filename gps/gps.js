var mongoose = require('mongoose');
var gpsSchema = new mongoose.Schema({
	device_id: String,
	lat: String,
	long: String,
	alarm: Boolean,
	timestamp: String
});

mongoose.model('gpsTick', gpsSchema);

module.exports = mongoose.model('gpsTick');
