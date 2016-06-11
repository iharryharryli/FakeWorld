
function setupWindow(player){

      window.addEventListener("keydown", function(e){
        if(e.keyCode == 65){
           //player.delegate.turningSpeed = turningSpeed;
           player.delegate.turningState = 1;
           update(player);
        }
        else if(e.keyCode == 83){
           //player.delegate.turningSpeed = 0 - turningSpeed;
           player.delegate.turningState = -1;
           update(player);
        }

      },false);

      window.addEventListener("keyup", function(e){
        player.delegate.turningState = 0;
        update(player);
      },false);
      
      
      window.addEventListener("touchstart",function(e){
          if(e.changedTouches[0].clientX<window.innerWidth/2){
            player.delegate.turningState = 1;
            update(player);
          }
          else{
            player.delegate.turningState = -1;
            update(player);
          } 

      });

      window.addEventListener("touchend",function(e){
          player.delegate.turningState = 0;
          update(player);
      });
        
      
      window.setInterval(function(){core.draw()},core.interval);
    }