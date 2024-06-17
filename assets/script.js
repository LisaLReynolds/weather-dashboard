//capture DOM references in variables
const APIKey = "cb24d24d8453e8913e3e2981cbfc2bdd";
const cityInputEl = document.querySelector("#search-input");

//capture user input

function handleFormSubmit(event) {
  event.preventDefault();
  let city = cityInputEl.value;
  currentWeather(city);
}
//capture current day weather

function currentWeather(city) {
  //make api call for daily forecast
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderCurrentWeather(data);
      const { lat, lon } = data.coord;
      //make api call for 5 day forecast
      const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
      fetch(apiUrlForecast)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          fiveDayForecast(data);
        });
    });

  //then dynamically create element to display
}
function renderCurrentWeather(data) {
  const todayEl = document.querySelector("#today");
  const nameEl = document.createElement("h2");
  nameEl.textContent = data.name;

  const dateEl = document.createElement("h2");
  dateEl.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY");

  const tempEl = document.createElement("p");
  tempEl.textContent = Math.round(data.main.temp) + " F";

  const humidEl = document.createElement("p");
  humidEl.textContent = data.main.humidity + " %";

  const windEl = document.createElement("p");
  windEl.textContent = Math.round(data.wind.speed) + " mph";

  const iconEl = document.createElement("img");
  const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  iconEl.src = iconUrl;

  todayEl.append(nameEl, dateEl, iconEl, tempEl, humidEl, windEl);
}

function fiveDayForecast(data) {
  const forecastEl = document.querySelector("#forecast");
  //let i = 6 because returned data has multiple temps per day, so 6th is middle of day
  for (let i = 6; i < data.list.length; i += 8) {
    const dateEl = document.createElement("h2");
    dateEl.textContent = dayjs.unix(data.list[i].dt).format("MM/DD/YYYY");

    const tempEl = document.createElement("p");
    tempEl.textContent = Math.round(data.list[i].main.temp) + " F";

    const humidEl = document.createElement("p");
    humidEl.textContent = data.list[i].main.humidity + " %";

    const windEl = document.createElement("p");
    windEl.textContent = Math.round(data.list[i].wind.speed) + " mph";

    const iconEl = document.createElement("img");
    const iconUrl = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
    iconEl.src = iconUrl;
    forecastEl.append(dateEl, iconEl, tempEl, humidEl, windEl);
  }
}

//add event listener to the button, call a function

//local storage piece  --  ["denver", "san diego"]

document
  .querySelector("#search-form")
  .addEventListener("submit", handleFormSubmit);
