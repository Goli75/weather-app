let now = new Date();
let date = document.querySelector("div");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
date.innerHTML = `${day}, ${hours}:${minutes}`;

let units = "metric";
 

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();

let days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri","Sat"];
return days[day];
}

function displayWeatherForecast(response) {
 let forecast = response.data.daily;
  let weatherForecastElement = document.querySelector("#weather-forecast")

  let weatherForecastHTML = `<div class="row">`;

  forecast.forEach(function(forecastDay, index){
if (index < 4) { 
    weatherForecastHTML = weatherForecastHTML + `
  <div class="col-3">
    <div class="day">${formatDay(forecastDay.dt)}</div>
    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="50"/>
    <div class="max-min-temp">  
      <span class="max-temp"> ${Math.round(forecastDay.temp.max)}°</span>
      <span class="min-temp"> ${Math.round(forecastDay.temp.min)}°</span>
    </div>
</div>
`;
  }
});

weatherForecastHTML = weatherForecastHTML + `</div>`;
weatherForecastElement.innerHTML = weatherForecastHTML;
}
function getWeatherForecast(coordinates) {
console.log(coordinates);
let apiKey = "a71922a462ba2496a97237966e452f8d";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&
units=metric`
axios.get(apiUrl).then(displayWeatherForecast);
}
function showPosition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
 document.querySelector("#humidity").innerHTML = response.data.main.humidity;
 document.querySelector("#windSpeed").innerHTML = Math.round(
   response.data.wind.speed
   );
 document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
celciusTemperature = Math.round(response.data.main.temp);
getWeatherForecast(response.data.coord);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function searchPosition(position) {
  let apiKey = "a71922a462ba2496a97237966e452f8d";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showPosition);
}


function search(event) {
  event.preventDefault();
  let apiKey = "a71922a462ba2496a97237966e452f8d";
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showPosition);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  farenheit.classList.add("active");
  celcius.classList.remove("active");
let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
document.querySelector("#temperature").innerHTML = Math.round(farenheitTemperature);
}

 function showCelciusTemp(event) {
event.preventDefault();
celcius.classList.add("active");
farenheit.classList.remove("active");
document.querySelector("#temperature").innerHTML = celciusTemperature;
 }
let celciusTemperature = null;


let forms = document.querySelector("#searched-city");
forms.addEventListener("submit", search);
let buttonLocation = document.querySelector("#current");
buttonLocation.addEventListener("click", currentPosition);

document.querySelector("#farenheit").addEventListener("click", showFarenheitTemp);
document.querySelector("#celcius").addEventListener("click", showCelciusTemp);
