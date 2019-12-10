// Gets weather information
function getUserLocation(){
  return new Promise((res,rej)=>{
    function handler(pos){
      res(pos);
    }
    function error(err){
      rej(err);
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(handler,error);
    }else{
      rej(false);
    }
  });
}
