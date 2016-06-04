
module.exports.login = function(delegate){
var bodyParser = require('body-parser');
var database = require('./database.js');

var jsonParser = bodyParser.json();


delegate.post('/login',jsonParser,function (req, res) {
		database.login(req.body.type,res);
	});
};


