//capture DOM references in variables
const APIKey = "cb24d24d8453e8913e3e2981cbfc2bdd";
const cityInputEl = document.querySelector("#search-input");

//capture user input
let city = cityInputEl.value;

//capture current day weather

function currentWeather() {
  //make api call
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  //then dynamically create element to display
}

function fiveDayForecast() {}

//add event listener to the button, call a function

//local storage piece  --  ["denver", "san diego"]
