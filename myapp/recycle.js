var INTERVAL_FOR_RECYCLE = 6000

var DB = require('./dbsetup.js');

function recycle(){
	var db = DB.db;
	var deadline = Date.now() - INTERVAL_FOR_RECYCLE;
	db.collection('users').find({lastUpdated:{$lt:deadline}}).
		toArray(function(err,docs){
			//console.log("lala");
			docs.forEach(function(value,index,arr){
				db.collection('users').deleteOne({ID:value.ID},function(){
					db.collection('pool').insertOne({ID:value.ID});

				});
			});

		});

}

module.exports.trigger = function(){
	setInterval(recycle,1000);
}