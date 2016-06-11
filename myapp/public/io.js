var socket = io();

function register(res) {
	console.log("starting to register");
	socket.emit('new car', {socket: socket.toString(), ID: res.ID});
	console.log("finished registering");
	update(res);
	console.log("finished updating self");
}

function update(res) {
	console.log("updating");
	socket.emit('update', {car: {positionx:res.delegate.delegate.position.x,
								positiony:res.delegate.delegate.position.y,
								positionz:res.delegate.delegate.position.z,
							   	angle:res.delegate.delegate.rotation.y,
							   	velocityx:res.delegate.velocity.x,
							   	velocityy:res.delegate.velocity.y,
							   	velocityz:res.delegate.velocity.z,
							   	state:res.delegate.turningState,
								}, ID: res.ID});
}