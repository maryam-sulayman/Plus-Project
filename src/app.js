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

  console.log(response);
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", cityName);
