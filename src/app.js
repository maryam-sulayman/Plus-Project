function formatDate() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDateAndTime = document.querySelector("#date-and-time");
  currentDateAndTime.innerHTML = `Last updated: ${day} ${hours}:${minutes}`;
}
formatDate();

function cityName(event) {
  event.preventDefault();
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let city = document.querySelector("#city-name").value;
  city = city.trim();
  search(city);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
  let key = "d46f1b703c43197t9d1457e4fbea3dco";
  let iconUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
  axios.get(iconUrl).then(displayIcon);
}
function search(city) {
  if (city) {
    let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeather);
    let key = "d46f1b703c43197t9d1457e4fbea3dco";
    let iconUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
    axios.get(iconUrl).then(displayIcon);
  } else {
    alert("Please enter a city");
  }
}

function displayWeather(response) {
  let h1 = document.querySelector("h1");
  let humidity = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let windspeed = Math.round(response.data.wind.speed);
  let temperature = document.querySelector("#temperature");
  h1.innerHTML = response.data.name;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windspeedElement.innerHTML = `Windspeed: ${windspeed} Km/h`;
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function showLiveLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  let key = "d46f1b703c43197t9d1457e4fbea3dco";
  let iconUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${key}`;
  axios.get(iconUrl).then(displayIcon);
}

function displayIcon(response) {
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  description.innerHTML = response.data.condition.description;
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.icon);
}

function liveLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLiveLocation);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", cityName);

let currentLocation = document.querySelector("#live-location");
currentLocation.addEventListener("click", liveLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Tokyo");
