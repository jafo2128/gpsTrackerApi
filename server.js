var app = require('./app');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
	console.log('Server bound to port ' + port);
});