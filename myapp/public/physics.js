function PhyscisEngine(){
	var res = {};
	var world = new CANNON.World();
	world.gravity.set(0,0,-10);
	world.broadphase = new CANNON.SAPBroadphase(world);
	var groundMaterial = new CANNON.Material("groundMaterial");
	var groundShape = new CANNON.Box(new CANNON.Vec3(50,50,0.1));
    var ground = new CANNON.Body({ mass: 0, material: groundMaterial });
    ground.addShape(groundShape);
	world.add(ground);
	res.world = world;
	res.ground = ground;
	res.update = function(d){
		res.world.step(d);
	};
	return res;

}

function CarEntity(dPosition,dQuaternion){
	var mass = 1;
    var vehicle;
    		var wheelMaterial = new CANNON.Material("wheelMaterial");
            var wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, corePhysics.ground.material, {
                friction: 0.3,
                restitution: 0,
                
            });

            // We must add the contact materials to the world
            corePhysics.world.addContactMaterial(wheelGroundContactMaterial);
            var chassisShape;
            var ww = 0.45,hh=0.15,dd=0.15;
            var centerOfMassAdjust = new CANNON.Vec3(0, 0, -0.2);
            chassisShape = new CANNON.Box(new CANNON.Vec3(ww, dd, hh));
            var chassisBody = new CANNON.Body({ mass: 3 });
            chassisBody.addShape(chassisShape);
            chassisBody.position = dPosition;
            chassisBody.quaternion = dQuaternion;

            

            // Create the vehicle
            vehicle = new CANNON.RigidVehicle({
                chassisBody: chassisBody
            });

            var axisWidth = 1 ;
            var wheelShape = new CANNON.Sphere(0.15);
            var down = new CANNON.Vec3(0, 0, -1);

            var wheelBody = new CANNON.Body({ mass: mass, material: wheelMaterial });
            wheelBody.addShape(wheelShape);
            vehicle.addWheel({
                body: wheelBody,
                position: new CANNON.Vec3(ww, axisWidth/2, 0).vadd(centerOfMassAdjust),
                axis: new CANNON.Vec3(0, 1, 0),
                direction: down
            });

            var wheelBody = new CANNON.Body({ mass: mass, material: wheelMaterial });
            wheelBody.addShape(wheelShape);
            vehicle.addWheel({
                body: wheelBody,
                position: new CANNON.Vec3(ww, -axisWidth/2, 0).vadd(centerOfMassAdjust),
                axis: new CANNON.Vec3(0, -1, 0),
                direction: down
            });

            var wheelBody = new CANNON.Body({ mass: mass, material: wheelMaterial });
            wheelBody.addShape(wheelShape);
            vehicle.addWheel({
                body: wheelBody,
                position: new CANNON.Vec3(-ww, axisWidth/2, 0).vadd(centerOfMassAdjust),
                axis: new CANNON.Vec3(0, 1, 0),
                direction: down
            });

            var wheelBody = new CANNON.Body({ mass: mass, material: wheelMaterial });
            wheelBody.addShape(wheelShape);
            vehicle.addWheel({
                body: wheelBody,
                position: new CANNON.Vec3(-ww, -axisWidth/2, 0).vadd(centerOfMassAdjust),
                axis: new CANNON.Vec3(0, -1, 0),
                direction: down
            });

            // Some damping to not spin wheels too fast
            for(var i=0; i<vehicle.wheelBodies.length; i++){
                vehicle.wheelBodies[i].angularDamping = 0.2;
            }

            //chassisBody.position = dPosition;
            //chassisBody.quaternion = dQuaternion;
            vehicle.addToWorld(corePhysics.world);

            return vehicle;


}