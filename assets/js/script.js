//function for today's large weather card
function todayWeather(data) {

  document.getElementById("icon1").src = "http://openweathermap.org/img/wn/"+(data.list[0].weather[0].icon) +".png";
  document.getElementById("cityName").innerHTML = data.city.name;
  document.getElementById("temp").innerHTML =
    "Temperature: " + data.list[0].main.temp + " °K";
  document.getElementById("windSpeed").innerHTML =
    "Wind Speed: " + data.list[0].wind.speed + "mph";
  document.getElementById("humidity").innerHTML =
    "Humidity: " + data.list[0].main.humidity + "%";
}

//display none for five day weather
var fiveDays = document.getElementById("forecast");
  fiveDays.style.display = "none";


//get five days of weather from api
function fiveDayWeather(data) {
  
  document.getElementById("day1Name").innerHTML = data.list[0].dt_txt;
  document.getElementById("icon1").src = "http://openweathermap.org/img/wn/"+(data.list[0].weather[0].icon) +".png";
  document.getElementById("day1Temp").innerHTML = "Temperature: " + (data.list[0].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[0].wind.speed + "mph";
  document.getElementById("day1Humid").innerHTML = "Humidity: " + (data.list[0].main.humidity) + "%";

  document.getElementById("day2Name").innerHTML = data.list[7].dt_txt;
  document.getElementById("icon2").src = "http://openweathermap.org/img/wn/"+(data.list[7].weather[0].icon) +".png";
  document.getElementById("day2Temp").innerHTML = "Temperature: " + (data.list[7].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[7].wind.speed + "mph";
  document.getElementById("day2Humid").innerHTML = "Humidity: " + (data.list[7].main.humidity) + "%";

  document.getElementById("day3Name").innerHTML = data.list[15].dt_txt;
  document.getElementById("icon3").src="http://openweathermap.org/img/wn/"+(data.list[15].weather[0].icon) +".png";
  document.getElementById("day3Temp").innerHTML = "Temperature: " + (data.list[15].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[15].wind.speed + "mph";
  document.getElementById("day3Humid").innerHTML = "Humidity: " + (data.list[15].main.humidity) + "%";

  document.getElementById("day4Name").innerHTML = data.list[23].dt_txt;
  document.getElementById("icon4").src="http://openweathermap.org/img/wn/"+(data.list[23].weather[0].icon) +".png";
  document.getElementById("day4Temp").innerHTML = "Temperature: " + (data.list[23].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[23].wind.speed + "mph";
  document.getElementById("day4Humid").innerHTML = "Humidity: " + (data.list[23].main.humidity) + "%";

  document.getElementById("day5Name").innerHTML = data.list[31].dt_txt;
  document.getElementById("icon5").src="http://openweathermap.org/img/wn/"+(data.list[31].weather[0].icon) +".png";
  document.getElementById("day5Temp").innerHTML = "Temperature: " + (data.list[31].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[31].wind.speed + "mph";
  document.getElementById("day5Humid").innerHTML = "Humidity: " +(data.list[31].main.humidity) + "%";
}

//function for button click
const searchButtonClickHandler = (cityArray) => {
  console.log("clicked");
  var searchTerm = document.getElementById("search-value").value;
  console.log(searchTerm);

  //fetch api and run functions for large weather card and five days
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchTerm +
      "&appid=716afbf28becb55998e9b5759c5c3d94"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("got the data");
      console.log(data);
      todayWeather(data);
      fiveDayWeather(data);
    });

  //does not list duplicates
  if (!cityArray.includes(searchTerm) && searchTerm != "") {
    cityArray.push(searchTerm);
    localStorage.setItem("city", JSON.stringify(cityArray));
  }
  console.log(cityArray);
  fiveDays.style.display = "flex";
};


// when document is loaded
document.addEventListener("DOMContentLoaded", function () {
  var cityArray = JSON.parse(localStorage.getItem("city"));
  console.log(cityArray);

  //append list of recent searches
  if (!cityArray) {
    cityArray = [];
  }

  var newLi;
  function historyList() {
    var orderedList = document.getElementById("search-history");

    // delete any existing li before appending
    orderedList.innerHTML = "";

    for (let index = 0; index < cityArray.length; index++) {
      const cityName = cityArray[index];
      newLi = document.createElement("li");
      newLi.classList.add('recentSearches');
      const newLiContent = document.createTextNode(cityName);

      newLi.appendChild(newLiContent),
        orderedList.insertBefore(newLi, orderedList.firstChild);
    }

  }

  historyList();

  // button click function
  document
    .getElementById("city-search-btn")
    .addEventListener("click", function () {
      searchButtonClickHandler(cityArray);
      historyList();
      
    });
  

  
});



