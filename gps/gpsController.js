var express = require('express');
var api = express.Router();
var parser = require('body-parser');

api.use(parser.urlencoded({extended: true}));
api.use(parser.json());

var gps = require('./gps');


api.post('/', function (req, res) {
	gps.create({
		device_id: req.body.deviceId,
		lat: req.body.latitude,
		long: req.body.longitude,
		alarm: req.body.alarm,
		timestamp: Date.now()
	},
	function (error, gpsTick) {
		return error 
			? res.status(500).send('Error writting to DB')
			: res.status(200).send(gpsTick);
				
	});

});

api.get('/:slug', function(req, res) {
	gps.find({device_id:req.params.slug}, function(error, gpsTicks) {
		return error 
			? res.status(500).send("Unable to retreive gps ticks")
			: res.status(200).send(gpsTicks.sort((a,b) => b.timestamp - a.timestamp));
	});
});


api.delete('/:slug', function(req, res) {
	gps.deleteMany({device_id: req.params.slug},
		function (error) { 
			if (error) res.status(500).send('Unable to delete GPS data for: ' + req.params.slug);
			else res.status(200).send('GPS data for ' + req.params.slug + ' deleted')
			}
		)
})

// api.get('/', function(req, res) {

// 	gps.find({}, function(error, gpsTicks) {
// 		return error 
// 			? res.status(500).send("Unable to retreive gps ticks")
// 			: res.status(200).send(gpsTicks);
// 	});
// });

module.exports = api;