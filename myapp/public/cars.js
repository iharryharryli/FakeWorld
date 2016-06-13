function standardCarShape(scene,shadow){
	var center = new BABYLON.Mesh("",scene);
    center.position = new BABYLON.Vector3(0,0,0);

    var faceUV = new Array(6);

    for(var i=0; i<6; i++){
      faceUV[i] = new BABYLON.Vector4(i/6,(i+1)/6,0,1);
    }

    var options = {
      width: 1,
      height: 0.25,
      depth: 0.5,
      "faceUV": faceUV
    };

    var top = BABYLON.MeshBuilder.CreateBox("",{width:0.6,depth:0.45,height:0.15},scene);
    top.parent = center;
    top.position.y = 0.2;



    var main = BABYLON.MeshBuilder.CreateBox("",options,scene);

    main.parent = center;

    var material = new BABYLON.StandardMaterial("Mat", scene);
    material.diffuseTexture = new BABYLON.Texture("res/cars/standard/mosaic.png", scene); 
    main.material = material;
    top.material = material;

    function wheel(){
      var a = BABYLON.MeshBuilder.CreateBox("",{size:0.15},scene);
      var m = new BABYLON.StandardMaterial("",scene);
      m.diffuseColor = new BABYLON.Color3(0,0,0);
      a.material = m;
      a.parent = center;
      shadow.getShadowMap().renderList.push(a);
      return a;
    }

    function mirror(){
      var a = BABYLON.MeshBuilder.CreateBox("",{size:0.05},scene);
      a.position.x = 0.22;
      a.position.y = 0.15;
      a.parent = center;
      return a;
    }

    for(var i=-1; i<2; i+=2)for(var j=-1; j<2; j+=2){
      var t = wheel();
      t.position.x = i * 0.3;
      t.position.z = j * 0.2;
      t.position.y = -0.07;
    }

    var m1 = mirror();
    m1.position.z = -0.25;
    var m2 = mirror();
    m2.position.z = 0.25;


    shadow.getShadowMap().renderList.push(main);
    shadow.getShadowMap().renderList.push(top);


    return center;
  
}