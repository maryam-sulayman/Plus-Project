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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let h1 = document.querySelector("h1");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let windspeed = Math.round(response.data.wind.speed);
  let temperature = document.querySelector("#temperature");
  h1.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windspeedElement.innerHTML = `Windspeed: ${windspeed} Km/h`;
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function showLiveLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function liveLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLiveLocation);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", cityName);

let currentLocation = document.querySelector("#live-location");
currentLocation.addEventListener("click", liveLocation);
