var turningSpeed = 4;


function setupWindow(aCar){

      window.addEventListener("keydown", function(e){
      	if(e.keyCode == 65){
      	   //aCar.turningSpeed = turningSpeed;
           aCar.turn(-1);
      	}
      	else if(e.keyCode == 83){
      		 //aCar.turningSpeed = 0 - turningSpeed;
           aCar.turn(1);
      	}

      },false);

      window.addEventListener("keyup", function(e){
        aCar.turn(0);
      },false);
      
      
      
      
      window.addEventListener("touchstart",function(e){
          if(e.changedTouches[0].clientX<window.innerWidth/2){
            aCar.turn(-1);
          }
          else{
            aCar.turn(1);
          } 

      });

      window.addEventListener("touchend",function(e){
          aCar.turn(0);
      });
        
      
      window.setInterval(function(){core.draw()},core.interval);
    }