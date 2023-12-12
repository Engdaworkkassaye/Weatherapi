document.addEventListener('DOMContentLoaded', function() {
   var weatherApiKey = 'eecdb115b83cae8457be9ee2add510db';
  
    var searchFormElement = document.getElementById('search-form');
    var cityInputElement = document.getElementById('city-input');
    var currentWeatherElement = document.getElementById('current-weather');
    var forecastElement = document.getElementById('forecast');
    var searchHistoryElement = document.getElementById('search-history');
  
    var formatDateTime = function(timestamp) {
      var date = new Date(timestamp * 1000);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();
      return month + '/' + day + '/' + year;
    };
  
   
    var displayCurrentWeather = function(weatherData) {
        var tempFahrenheit = Math.round(weatherData.main.temp * 9/5 + 32);
        var iconUrl = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '.png';
        currentWeatherElement.innerHTML = '<h2 class="text-2xl mb-4 flex items-center">' +
            weatherData.name +
            '<img src="' + iconUrl + '" alt="Weather Icon" class="ml-2">' +
            '</h2>' +
            '<p>Date: ' + formatDateTime(weatherData.dt) + '</p>' +
            '<p>Temperature: ' + tempFahrenheit + '°F</p>' +
            '<p>Wind: ' + weatherData.wind.speed + ' mph</p>' +
            '<p>Humidity: ' + weatherData.main.humidity + '%</p>';
    };
    
    
    
    
  
 
    var displayForecast = function(forecastData) {
      var forecastList = forecastData.list.slice(0, 5);
      var forecastHTML = '<h2 class="text-xl mb-4">5-Day Forecast:</h2>' +
        '<div class="grid grid-cols-5 gap-4">';
      forecastList.forEach(function(forecastItem) {
        forecastHTML += '<div class="bg-gray-500 p-4 rounded shadow text-white">' +
          '<p>Date: <span class="font-bold">' + formatDateTime(forecastItem.dt) + '</span></p>' +
          '<p>Temperature: ' + Math.round(forecastItem.main.temp * 9/5 + 32) + '°F</p>' +
          '<img src="http://openweathermap.org/img/wn/' + forecastItem.weather[0].icon + '.png" alt="Weather Icon">' +
          '<p>Wind: ' + forecastItem.wind.speed + ' mph</p>' +
          '<p>Humidity: ' + forecastItem.main.humidity + '%</p>' +
          '</div>';
      });
      forecastElement.innerHTML = forecastHTML + '</div>';
    };
  

    var fetchWeatherData = async function(cityName) {
     var weatherQuery = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + weatherApiKey + '&units=metric'
      var weatherResponse = await fetch(weatherQuery);
      var weatherData = await weatherResponse.json();
      return weatherData;
    };
  
 
    var fetchForecastData = async function(cityName) {
        var forecastQuery = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + weatherApiKey + '&units=metric';
      var forecastResponse = await fetch(forecastQuery);
      var forecastData = await forecastResponse.json();
      return forecastData;
    };
   var addToSearchHistory=function(cityName)
   {
    var historyListitem= document.createElement('li');historyListitem.textContent=cityName;
    historyListitem.classList.add ('cursor-pointer',hover:text-blue-500');
    historyListitem.addEventListener('click',function()){
      cityInputElement.value=cityName;searchFormElement.dispatchEvent(newEvent('submit'));
    });
    searchHistoryElement.appendChild(historyListitem);
    var searchHistory= JSON.parse(localStorage.getItem(searchHistoryElement));
   }
   console.log(data)
    searchFormElement.addEventListener('submit', async function(event) {
        event.preventDefault();
        var cityName = cityInputElement.value.trim();
  
        if (cityName) {
            var weatherData = await fetchWeatherData(cityName);
            var forecastData = await fetchForecastData(cityName);
  
            if (weatherData && forecastData) {
                displayCurrentWeather(weatherData);
                displayForecast(forecastData);
                addToSearchHistory(cityName);
            }
        }
    });


    
});