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
    // Today's weather
    const response = await getWeather(o);
    const data = JSON.parse(response)[0];
    const now = data.current;
    const forecast = data.forecast;
    const weImage = document.getElementById("image").querySelector("img");
    weImage.src = now.imageUrl;
    weImage.style.display = "inline-block";
    const template = document.createElement("template");
    template.innerHTML = `
    <h2 style="display: inline-block;">Weather for ${now.day}, ${now.date}</h2>
    <div class="indent">
      <h3>${now.skytext} skies</h3>
      <h3>Temperature: ${now.temperature} F</h3>
      <h3>Wind: ${now.winddisplay}</h3>
      <h3>Humidity: ${now.humidity}</h3>
    </div>
    `;
    document.getElementById("image").append(template.content.cloneNode(true));
    // Forecast
    const forcast = document.createElement("template");
    forcast.innerHTML = `
    <div class="indent row-flex flex" style="flex: 1">
      ${ForecastHTML(forecast)}
    </div>
    `;
    document.getElementById("forecast").append(forcast.content.cloneNode(true));
  }).catch(e=>{
    if(e == false){
      // no geolocation provided
    }else{
      // geolocation not accepted
    }
  });
}
renderWeatherForecast();

function ForecastHTML(data){
  let str = "";
  for(let i = 0; i<data.length;++i){
    str+=`
    <div class="forecast">
      <img src="http://blob.weather.microsoft.com/static/weather4/en-us/law/${data[i].skycodeday}.gif">
      <h4>${data[i].shortday}, ${data[i].date}</h4>
      <h5>${data[i].skytextday} skies</h5>
      <h5>High: ${data[i].high} F</h5>
      <h5>Low: ${data[i].low} F</h5>
      <h5>Precipitation Chance: ${data[i].precip || data[i].precip === 0 ? data[i].precip + "%" : "unknown"}</h5>
    </div>
    `
  }
  return str;
}
