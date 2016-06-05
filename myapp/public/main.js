var updateInterval = 15;
var cleanUpInterval = 1000;

var catchUpInterval = 0.15;

function Player(someID,someProfile){
	var res = {};
	res.delegate = CarEntity(0,0);
	res.delegate.goWithAngle = false;
	res.delegate.delegate.position = new BABYLON.Vector3(someProfile.x,someProfile.y,someProfile.z);
	res.delegate.delegate.rotation.y = someProfile.angle;
	core.add(res.delegate);
	res.ID = someID;
	res.update = function(newProfile){
		

		res.delegate.turningSpeed = (newProfile.angle - res.delegate.delegate.rotation.y)/catchUpInterval;		

		var current = new BABYLON.Vector3(newProfile.x,newProfile.y,newProfile.z);
		res.delegate.velocity = (current.subtract(res.delegate.delegate.position)).scale(1/catchUpInterval);
	};
	res.remove = function(){
		core.delete(res.delegate.delegate);
		res = null;
	};
	
	return res;

};

function Me(ID,speed,angle){
	var res = {};
	res.delegate = CarEntity(10,7);
	res.ID = ID;
	res.delegate.velocity = new BABYLON.Vector3(speed*Math.sin(angle),0,speed*Math.cos(angle));
	res.delegate.delegate.rotation.y = angle;
	res.update = function(){
		postJson("updateSelf",{profile:
							   {x:res.delegate.delegate.position.x,
							   y:res.delegate.delegate.position.y,
							   z:res.delegate.delegate.position.z,
							   angle:res.delegate.delegate.rotation.y,
							   },
							   ID:res.ID
							},function(){window.setTimeout(res.update,updateInterval);});
	};
	core.add(res.delegate);
	core.cameraFollow = res.delegate.delegate;
	res.update();
	return res;
};

function StoryBegin(myID){

	var me = Me(myID,1.5,0);
	setupWindow(me.delegate);

	var others = PlayerManager(myID);
}

function PlayerManager(myID){
	var res = {};
	res.me = myID;
	res.players = [];

	res.exist = function(some){
		for(var i=0; i<res.players.length; i++){
			if(res.players[i].ID == some)return i;
		}
		return -1;
	};
    
    res.cleanUp = function(){    	
    	
    	postJson("fetchOthers",{me:res.me},function(r){
    		var result = [];
    		for(var i=0; i<res.players.length; i++){
    			var v = res.players[i];
    			var found = false;
    			for(var j=0; j<r.list.length; j++){
    				if(v.ID == r.list[j].ID){
    					found = true;
    					result.push(v);
    					break;
    				}
    			}
    			if(!found){
    				v.remove();
    			}
    		}
    		res.players = null;
    		res.players = result;
    		window.setTimeout(res.cleanUp,cleanUpInterval);
    	});
    }

	res.update = function(){
		postJson("fetchOthers",{me:res.me},function(r){
			//console.log(r.list.length);
			for(var i=0; i<r.list.length; i++){
				var temp = res.exist(r.list[i].ID);
				if(temp<0){
					var np = Player(r.list[i].ID,r.list[i].profile);
					res.players.push(np);
				}
				else{
					res.players[temp].update(r.list[i].profile);
				}
			}
			window.setTimeout(res.update,updateInterval);

		});
	}

	res.update();
	window.setTimeout(res.cleanUp,cleanUpInterval);
	
	return res;
}


