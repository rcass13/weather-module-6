console.log("hi im working");

function todayWeather(data) {
  document.getElementById("cityName").innerHTML = data.city.name;
  document.getElementById("temp").innerHTML =
    "Temperature: " + data.list[0].main.temp + " °K";
  document.getElementById("windSpeed").innerHTML =
    "Wind Speed: " + data.list[0].wind.speed + "mph";
  document.getElementById("humidity").innerHTML =
    "Humidity: " + data.list[0].main.humidity + "%";
}

// function weekDay(){
// //   const d = new Date();
// //   const weekday= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// //   function checkDay(day){
// //   if (day +d.getDay() > 6){
// //     return day+ d.getDay()-7;
// //   }else {
// //     return day+ d.getDay()
// //   }
// // }
// //   for(let i=0;i<5;i++){
// //     document.getElementById("day"+(i+1)).innerHTML = weekday[checkDay(i)]

// //   }

// }

function fiveDayWeather(data) {
  //get day from weekDay, Icon, Temp, Humidity
  // var dayNum = saveBtn.parent().attr("id").replace("hour-", "")

  // for(let i=0;i<5;i++){
  //   document.getElementById("day"+(i+1)).innerHTML = weekday[checkDay(i)]
  // }]
  // let i = 0;
  // const d = new Date();
  // const weekday = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // function checkDay(day) {
  //   if (day + d.getDay() > 6) {
  //     return day + d.getDay() - 7;
  //   } else {
  //     return day + d.getDay();
  //   }
  // }

  // // console.log(checkDay);
  // // for (i = 0; i < 5; i++) {
  // //   document.getElementById("day" + (i + 1)).innerHTML = weekday[checkDay(i)];
  // // }

  // document.getElementById("day" + (i + 1)).innerHTML = weekday[checkDay(i)];
  // document.getElementById("day" + (i + 1) + "Temp").innerHTML =
  //   "Temperature: " + data.list[i].main.temp + " °K";
  // document.getElementById("day" + (i + 1) + "Humid").innerHTML =
  //   "Humidity: " + data.list[i].main.humidity + "%";

  document.getElementById("icon1").src = "http://openweathermap.org/img/wn/"+(data.list[0].weather[0].icon) +".png";
  document.getElementById("day1Temp").innerHTML = "Temperature: " + (data.list[0].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[0].wind.speed + "mph";
  document.getElementById("day1Humid").innerHTML = "Humidity: " + (data.list[0].main.humidity) + "%";

  document.getElementById("icon2").src = "http://openweathermap.org/img/wn/"+(data.list[1].weather[0].icon) +".png";
  document.getElementById("day2Temp").innerHTML = "Temperature: " + (data.list[1].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[1].wind.speed + "mph";
  document.getElementById("day2Humid").innerHTML = "Humidity: " + (data.list[1].main.humidity) + "%";

  document.getElementById("icon3").src="http://openweathermap.org/img/wn/"+(data.list[2].weather[0].icon) +".png";
  document.getElementById("day3Temp").innerHTML = "Temperature: " + (data.list[2].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[2].wind.speed + "mph";
  document.getElementById("day3Humid").innerHTML = "Humidity: " + (data.list[2].main.humidity) + "%";

  document.getElementById("icon4").src="http://openweathermap.org/img/wn/"+(data.list[3].weather[0].icon) +".png";
  document.getElementById("day4Temp").innerHTML = "Temperature: " + (data.list[3].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[3].wind.speed + "mph";
  document.getElementById("day4Humid").innerHTML = "Humidity: " + (data.list[3].main.humidity) + "%";

  document.getElementById("icon5").src="http://openweathermap.org/img/wn/"+(data.list[4].weather[0].icon) +".png";
  document.getElementById("day5Temp").innerHTML = "Temperature: " + (data.list[4].main.temp) + "K";
  document.getElementById("windSpeed").innerHTML = "Wind Speed: " + data.list[4].wind.speed + "mph";
  document.getElementById("day5Humid").innerHTML = "Humidity: " +(data.list[4].main.humidity) + "%";
}
const searchButtonClickHandler = (cityArray) => {
  console.log("clicked");
  var searchTerm = document.getElementById("search-value").value;
  console.log(searchTerm);

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

  console.log("still going");
  if (!cityArray.includes(searchTerm) && searchTerm != "") {
    cityArray.push(searchTerm);
    localStorage.setItem("city", JSON.stringify(cityArray));
  }
  console.log(cityArray);
};

document.addEventListener("DOMContentLoaded", function () {
  var cityArray = JSON.parse(localStorage.getItem("city"));
  console.log(cityArray);

  if (!cityArray) {
    cityArray = [];
  }

  function historyList() {
    var orderedList = document.getElementById("search-history");

    // delete any existing li guys
    orderedList.innerHTML = "";

    for (let index = 0; index < cityArray.length; index++) {
      const cityName = cityArray[index];
      const newLi = document.createElement("li");
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

//next steps order backwards using cityArray method, not do duplicates
