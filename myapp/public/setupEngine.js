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

	
    

    

    
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light0);
    shadowGenerator.useVarianceShadowMap = true;

    var ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 1, scene);
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    

    materialPlane.diffuseTexture = new BABYLON.Texture("res/grass.jpg", scene);
    ground.material = materialPlane;
    materialPlane.diffuseTexture.uScale = 15.0;
    materialPlane.diffuseTexture.vScale = 15.0;
    ground.receiveShadows = true;
    shadowGenerator.bias = 0.01;

    ground.checkCollisions = true;

    
   

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
            t.shape.dispose();
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


    var core = Engine(FPS);
    core.camera = camera;
