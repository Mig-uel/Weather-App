const KEY = config.API_KEY;
const URL = config.BASE_URL;

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${URL}weather?q=${query}&units=imperial&APPID=${KEY}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

  let weatherElement = document.querySelector(".current .weather");
  weatherElement.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}°f / ${Math.round(weather.main.temp_max)}°f`;
}
function dateBuilder(d) {
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
    "December"
  ];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Fridat", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${month} ${date}  ${year}`;
}

function backgroundSwap() {
  let date = new Date();
  let hour = date.getHours();

  if (hour >= 18) {
    document.body.style.backgroundImage = "url('./bg-night.jpg')";
  }
  else if (hour < 18) {
    document.body.style.backgroundImage = "url('./bg-day.jpg')";
  }
}
backgroundSwap();