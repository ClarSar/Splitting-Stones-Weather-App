function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let now = new Date();
console.log(now.getDate());
let date = now.getDate();
let hour = addZero(now.getHours());
let minute = addZero(now.getMinutes());
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let h1 = document.querySelector("h1");
h1.innerHTML = `${day} ${date} ${month} ${year} ${hour}:${minute}`;

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let description = document.querySelector("h3");
  description.innerHTML = capitalizeFirstLetter(
    response.data.weather[0].description
  );
  let city = response.data.name;
  console.log(city);
  let humidity = document.querySelector("#humidity-data");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#windSpeed-data");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function capitalizeFirstLetter(description) {
  return description.charAt(0).toUpperCase() + description.slice(1);
}

function searchCity(city) {
  let apiKey = "749d11da7cc4bf5dcb36a5fdf40ecee1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#location-search-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  let city = searchInput.value;
  searchCity(city);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  console.log(lat);
  console.log(lon);

  let apiKey = "749d11da7cc4bf5dcb36a5fdf40ecee1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
let form = document.querySelector("#location-form");

form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Galway");
