var MongoClient = require('mongodb').MongoClient;
var DB  =  'mongodb://localhost:27017/LA';

module.exports.init = function(callback){
	MongoClient.connect(DB,function(err,db){
		module.exports.db = db;
		callback();
	});
}