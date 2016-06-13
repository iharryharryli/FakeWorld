	var canvas = document.getElementById("renderCanvas");
   	var engine = new BABYLON.Engine(canvas, true);

   	 var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);


    camera.attachControl(canvas, true);

    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.specular = new BABYLON.Color3(1, 1, 1);
    light0.groundColor = new BABYLON.Color3(0, 0, 0);

    

    engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
    window.addEventListener("resize", function () {
            engine.resize();
    });