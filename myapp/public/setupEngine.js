    var FPS = 50;


var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
window.addEventListener("resize", function () {
engine.resize();
engine.setHardwareScalingLevel(window.innerHeight/720);
        });

// Now create a basic Babylon Scene object 
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // This creates and positions a free camera
   var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(8, 8, 8), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky.
    var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
    
    light0.specular = new BABYLON.Color3(1, 1, 1);
    // Dim the light a small amount
    //light.intensity = .5;

    

    

    var ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 1, scene);
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    materialPlane.diffuseTexture = new BABYLON.Texture("res/grass.jpg", scene);
    ground.material = materialPlane;
    materialPlane.diffuseTexture.uScale = 15.0;
    materialPlane.diffuseTexture.vScale = 15.0;

 //   scene.collisionsEnabled = true;
  //  ground.checkCollisions = true;

    
   

    function Engine(fps){

    	var res = {};	

        res.interval = 1000/fps;
        res.intervalPerSecond = 1/fps;
        res.elements = [];
        res.add = function(t){
            res.elements.push(t);
        };
        res.delete = function(t){
            for(var i=0; i<res.elements.length; i++){
                if(res.elements[i] === t){
                    res.elements.splice(i,1);
                    break;
                }
            }
            t.dispose();
        };
        res.camera = null;
        res.cameraFollow = null;

        res.draw = function(){
            for(var i=0; i<res.elements.length; i++){
                res.elements[i].draw(res.intervalPerSecond);
            }
            if(res.cameraFollow!=null){
            	res.camera.position = res.cameraFollow.position.add(new BABYLON.Vector3(8, 8, 8));
            }
           
            scene.render();
        };

        return res;
        
    };

    function CarEntity(nimble,drift){
        var res = {};
        //UI for car
        var myBox = BABYLON.Mesh.CreateBox("box",0.3,scene);
        myBox.position.y = 0.15;
        myBox.scaling.z = 3;
        myBox.material = new BABYLON.StandardMaterial("Mat", scene);
        myBox.material.diffuseTexture = new BABYLON.Texture("res/crate.png", scene);
        var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        
            //Texture of each particle
            particleSystem.particleTexture = new BABYLON.Texture("res/flare.png", scene);
        
            // Where the particles come from
            particleSystem.emitter = myBox; // the starting object, the emitter
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

        res.delegate = myBox;
        res.velocity = new BABYLON.Vector3(0,0,0);

        res.turningSpeed = 0;
        res.turningAcc = nimble;
        res.turningState = 0;
        res.turningReturn = drift;

        res.goWithAngle = true;


        res.draw = function(duration){
            res.turningSpeed += duration*res.turningAcc*res.turningState;
            if(res.turningState == 0 && res.turningSpeed>0){
                res.turningSpeed -= res.turningReturn*duration;
                if(res.turningSpeed < 0)res.turningSpeed=0;
            }
            else if(res.turningState == 0 && res.turningSpeed<0){
                res.turningSpeed += res.turningReturn*duration;
                if(res.turningSpeed > 0)res.turningSpeed = 0;
            }
            res.delegate.rotation.y += duration * res.turningSpeed;

            if(res.turningSpeed != 0 && res.goWithAngle)res.manualTurn();

            var temp = res.velocity.scale(duration);
            
            res.delegate.position.addInPlace(temp); 
            
        };

        res.manualTurn = function (){
            var t = res.velocity.length();
            res.velocity.x = t * Math.sin(res.delegate.rotation.y);
            res.velocity.z = t * Math.cos(res.delegate.rotation.y);
        };



        return res;

    };



    var core = Engine(FPS);
    core.camera = camera;
