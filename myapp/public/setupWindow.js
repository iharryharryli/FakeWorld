var turningSpeed = 4;


function setupWindow(aCar){

      window.addEventListener("keydown", function(e){
      	if(e.keyCode == 65){
      	   //aCar.turningSpeed = turningSpeed;
           aCar.turningState = 1;
      	}
      	else if(e.keyCode == 83){
      		 //aCar.turningSpeed = 0 - turningSpeed;
           aCar.turningState = -1;
      	}

      },false);

      window.addEventListener("keyup", function(e){
        aCar.turningState = 0;
      },false);
      
      
      
      
      window.addEventListener("touchstart",function(e){
          if(e.changedTouches[0].clientX<window.innerWidth/2){
            aCar.turningState = 1;
          }
          else{
            aCar.turningState = -1;
          } 

      });

      window.addEventListener("touchend",function(e){
          aCar.turningState = 0;
      });
        
      
      window.setInterval(function(){core.draw()},core.interval);
    }