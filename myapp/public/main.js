var updateInterval = 15;
var cleanUpInterval = 1000;

var catchUpInterval = 0.15;

function Player(someID,someProfile){
	var res = {};
	res.vehicle = Car(0,0,scene);
	res.vehicle.goWithAngle = false;
	res.vehicle.shape.position = new BABYLON.Vector3(someProfile.x,someProfile.y,someProfile.z);
	res.vehicle.shape.rotation.y = someProfile.angle;
	core.add(res.vehicle);
	res.ID = someID;
	res.update = function(newProfile){
		

		res.vehicle.turningSpeed = (newProfile.angle - res.vehicle.shape.rotation.y)/catchUpInterval;		

		var current = new BABYLON.Vector3(newProfile.x,newProfile.y,newProfile.z);
		res.vehicle.velocity = (current.subtract(res.vehicle.shape.position)).scale(1/catchUpInterval);
	};
	res.remove = function(){
		core.delete(res.vehicle);
		
		res = null;
	};
	
	return res;

};

function Me(ID,speed,angle){
	var res = {};
	res.vehicle = Car(10,7,scene);
	res.ID = ID;
	res.vehicle.velocity = new BABYLON.Vector3(speed*Math.sin(angle),0,speed*Math.cos(angle));
	res.vehicle.shape.rotation.y = angle;
	res.update = function(){
		postJson("updateSelf",{profile:
							   {x:res.vehicle.shape.position.x,
							   y:res.vehicle.shape.position.y,
							   z:res.vehicle.shape.position.z,
							   angle:res.vehicle.shape.rotation.y,
							   },
							   ID:res.ID
							},function(){window.setTimeout(res.update,updateInterval);});
	};
	core.add(res.vehicle);
	core.cameraFollow = res.vehicle.shape;
	res.update();
	return res;
};

function StoryBegin(myID){

	var me = Me(myID,1.5,0);
	setupWindow(me.vehicle);

	//var others = PlayerManager(myID);
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


