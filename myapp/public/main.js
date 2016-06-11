var cars = [];

function Player(ID,speed,angle){
	var res = {};
	res.delegate = Car(10,7,scene);
	res.ID = ID;
	res.delegate.velocity = new BABYLON.Vector3(speed*Math.sin(angle),0,speed*Math.cos(angle));
	res.delegate.delegate.rotation.y = angle;
	core.add(res.delegate);
	cars.push(res);
	return res;
}

var me;

function StoryBegin(myID){
	me = Player(myID,1.5,0);
	core.cameraFollow = me.delegate.delegate;
	register(me);
	setupWindow(me);

}

