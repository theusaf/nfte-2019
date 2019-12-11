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
function getWeather(loc){
  return new Promise((res,rej)=>{
    const x = new XMLHttpRequest();
    x.open("GET",`${location.origin}/weather?loc=${loc.coords.latitude},${loc.coords.longitude}`);
    x.send();
    x.onload = ()=>{
      res(x.response);
    };
  });
}
async function renderWeatherForecast(){
  getUserLocation().then(async o=>{
    const response = await getWeather(o);
    const data = JSON.parse(response)[0];
    const now = data.current;
    const forecast = data.forecast;
    document.getElementById("image").querySelector("img").src = now.imageUrl;
    const template = document.createElement("template");
    template.innerHTML = `
    <h3>Weather for ${now.day}, ${now.date}</h3>
    <h4>${now.skytext} skies</h4>
    <h4>Temperature: ${now.temperature} F</h4>
    <h4>Wind: ${now.winddisplay}</h4>
    `;
    document.getElementById("image").append(template.content.cloneNode(true));
  }).catch(e=>{
    if(e == false){
      // no geolocation provided
    }else{
      // geolocation not accepted
    }
  });
}
renderWeatherForecast();
