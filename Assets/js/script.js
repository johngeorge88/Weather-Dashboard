var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var currentDayCard = document.getElementById("current-day");
var forecastData = document.getElementById("Forecast-data");
var searchHistory = document.getElementById("search-history");


var searchHandler = function (cityName) {
    event.preventDefault();
    currentDayCard.innerHTML = "";
    forecastData.innerHTML = "";
    var cityName = searchInput.value.trim();
    console.log(cityName);
    if (cityName) {
        getWeatherInfo(cityName);
        cityHistory(cityName);
        searchInput.value = "";
    } else {
        alert("Please enter a City Name!")
    }
};

var cityHistory = function (city) {
    var historyEl = document.createElement('Button');
    historyEl.setAttribute("class", "list-group-item list-group-item-action")
    historyEl.textContent = city;
    searchHistory.append(historyEl);

}


var getWeatherInfo = function (cityName) {
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=42ea263982f3e6fdce056c448e41a364" + "&units=imperial";
    // 5 Day forecast
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=42ea263982f3e6fdce056c448e41a364" + "&units=imperial";

    fetch(currentURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayTodayWeather(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
    fetch(forecastURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (forecast) {
                console.log(forecast);
                displayForecastWeather(forecastData);
            });
        }
    })

};

var displayTodayWeather = function (data) {
    // Current Day
    var todayCad = document.createElement("div");
    currentDayCard.appendChild(todayCad);
    todayCad.innerHTML = "<h2 class='card-title'>" + data.name + moment().format(" (MM/DD/YY)") + "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'>" + "</h2>";
    // todayCad.setAttribute("class", "card");

    var todayTemp = document.createElement("p");
    todayTemp.textContent = "Temperature: " + data.main.temp + " °F";
    todayTemp.setAttribute("class", "card-text");
    currentDayCard.appendChild(todayTemp);
    var todayHumidity = document.createElement("p");
    todayHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    currentDayCard.appendChild(todayHumidity);
    var todayWindSpeed = document.createElement("p");
    todayWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    currentDayCard.appendChild(todayWindSpeed);
    var todayUVindex = document.createElement("p");
    todayUVindex.textContent = "UV Index: " + "<span class='alert alert-danger'>" + data.wind.speed + "</span>";

    currentDayCard.appendChild(todayUVindex);
}

var displayForecastWeather = function (forecast) {
    var forecastEl = document.createElement("div");
    forecastData.appendChild(forecastEl);

    var forecastTitle = document.createElement("h2")
    forecastTitle.textContent = "5-Day Forecast:";
    forecastEl.appendChild(forecastTitle);


}

searchBtn.addEventListener("click", searchHandler);