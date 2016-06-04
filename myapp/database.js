var capacity = 10;


var DB = require('./dbsetup.js');

module.exports.login = function (type,res){		
		var db = DB.db;

		db.collection('pool').find().toArray(function(err,docs){
			
			if(docs.length == 0){
				res.json({success:false});
			}
			else{

				db.collection('pool').deleteOne({ID:docs[0].ID},function(){
					db.collection('users').insertOne({ID:docs[0].ID,lastUpdated:Date.now(),
						profile:{x:0,y:0,z:0,angle:0}},function(){
						res.json({success:true, userID:docs[0].ID});
					});
				});
				
			}
		});
};

module.exports.reset = function (type){
	var db = DB.db;
		db.dropDatabase();
		for(var i=0; i<capacity; i++){
			db.collection('pool').insertOne({ID:i});
		}
};

module.exports.updatePos = function(req,res,next){
	var pack = req.body;
	var db = DB.db;
		db.collection('users').replaceOne({ID:pack.ID},{ID:pack.ID,profile:pack.profile,lastUpdated:Date.now()});
	next();
};

module.exports.fetchOthers = function(req,res,next){
	var pack = req.body;
	var db = DB.db;
		db.collection('users').find({ID:{$ne:pack.me}}).toArray(function(err,docs){
			res.json({list:docs});
	});	
};


