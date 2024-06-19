//capture DOM references in variables
const APIKey = "cb24d24d8453e8913e3e2981cbfc2bdd";
const cityInputEl = document.querySelector("#search-input");

//capture user input

function handleFormSubmit(event) {
  event.preventDefault();
  let city = cityInputEl.value;
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.unshift(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  console.log(searchHistory);
  currentWeather(city);
  cityInputEl.value = "";
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

  const dateEl = document.createElement("h4");
  dateEl.textContent = dayjs.unix(data.dt).format("MM/DD/YYYY");

  const tempEl = document.createElement("p");
  tempEl.textContent = "Temp:  " + Math.round(data.main.temp) + " F";

  const humidEl = document.createElement("p");
  humidEl.textContent = "Humidity:  " + data.main.humidity + " %";

  const windEl = document.createElement("p");
  windEl.textContent = "Wind Speed:  " + Math.round(data.wind.speed) + " mph";

  const iconEl = document.createElement("img");
  const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  iconEl.src = iconUrl;

  todayEl.append(nameEl, dateEl, iconEl, tempEl, humidEl, windEl);
}

function fiveDayForecast(data) {
  const forecastEl = document.querySelector("#forecast");
  const titleEl = document.createElement("h3");
  titleEl.textContent = "5-Day Forecast:";
  forecastEl.appendChild(titleEl);

  // Create a container div for forecast items
  const forecastContainer = document.createElement("div");
  forecastContainer.classList.add("forecast-container");
  //let i = 6 because returned data has multiple temps per day, so 6th is middle of day
  for (let i = 6; i < data.list.length; i += 8) {
    const forecastItem = document.createElement("div"); //create div element
    forecastItem.classList.add("forecast-item"); //add class to div element

    const dateEl = document.createElement("h4");
    dateEl.textContent = dayjs.unix(data.list[i].dt).format("MM/DD/YYYY");

    const tempEl = document.createElement("p");
    tempEl.textContent = "Temp:  " + Math.round(data.list[i].main.temp) + " F";

    const humidEl = document.createElement("p");
    humidEl.textContent = "Humidity:  " + data.list[i].main.humidity + " %";

    const windEl = document.createElement("p");
    windEl.textContent =
      "Wind Speed:  " + Math.round(data.list[i].wind.speed) + " mph";

    const iconEl = document.createElement("img");
    const iconUrl = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
    iconEl.src = iconUrl;

    forecastItem.append(dateEl, iconEl, tempEl, humidEl, windEl);
    forecastContainer.appendChild(forecastItem);
  }
  forecastEl.appendChild(forecastContainer); // Append the container with forecast items
}

//add event listener to the button, call a function

document
  .querySelector("#search-form")
  .addEventListener("submit", handleFormSubmit);

//local storage piece  --  ["denver", "san diego"]
