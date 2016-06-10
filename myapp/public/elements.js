function createCarParticle(emmiter,scene){
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        
            //Texture of each particle
            particleSystem.particleTexture = new BABYLON.Texture("res/flare.png", scene);
        
            // Where the particles come from
            particleSystem.emitter = emmiter; // the starting object, the emitter
            particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
            particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...
        
            // Colors of all particles
            particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
            particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
            particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
        
            // Size of each particle (random between...
            particleSystem.minSize = 0.1;
            particleSystem.maxSize = 0.5;
        
            // Life time of each particle (random between...
            particleSystem.minLifeTime = 0.3;
            particleSystem.maxLifeTime = 1.5;
        
            // Emission rate
            particleSystem.emitRate = 1500;
        
            // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
            particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        
            // Set the gravity of all particles
            particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        
            // Direction of each particle after it has been emitted
            particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
            particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);
        
            // Angular speed, in radians
            particleSystem.minAngularSpeed = 0;
            particleSystem.maxAngularSpeed = Math.PI;
        
            // Speed
            particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 3;
            particleSystem.updateSpeed = 0.005;
        
            // Start the particle system
            particleSystem.start();

}

function CarShape(){
	var myBox = BABYLON.Mesh.CreateBox("box",0.3,scene);
    myBox.position.y = 0.15;
    myBox.scaling.z = 3;
    myBox.material = new BABYLON.StandardMaterial("Mat", scene);
	myBox.material.diffuseTexture = new BABYLON.Texture("res/crate.png", scene);    
	shadowGenerator.getShadowMap().renderList.push(myBox);
	createCarParticle(myBox,scene);
	return myBox;
}

function Car(nimble,drift,scene){
        var res = {};
        //UI for car
        
        
        
        res.shape = CarShape();
        res.entity = CarEntity();
        res.velocity = new BABYLON.Vector3(0,0,0);

        res.turningSpeed = 0;
        res.turningAcc = nimble;
        res.turningState = 0;
        res.turningReturn = drift;

        res.goWithAngle = true;
        

        res.draw = function(duration){

            
            res.shape.position = positionFromPhy(res.entity.chassisBody.position); 
            res.shape.rotationQuaternion = quaternionFromPhy(res.entity.chassisBody.quaternion); 
        };

        res.manualTurn = function (){
            var t = res.velocity.length();
            res.velocity.x = t * Math.sin(res.shape.rotation.y);
            res.velocity.z = t * Math.cos(res.shape.rotation.y);
        };



        return res;

};

