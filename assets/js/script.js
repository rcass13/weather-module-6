console.log("hi im working");

function todayWeather(data){
  document.getElementById("cityName").innerHTML = data.city.name;
  document.getElementById("temp").innerHTML = "Temperature: " + data.list[0].main.temp + " °F";
  document.getElementById("windSpeed").innerHTML = ("Wind Speed: " + data.list[0].wind.speed + "mph");
  document.getElementById("humidity").innerHTML = ("Humidity: " + data.list[0].main.humidity + "%");
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
    orderedList.innerHTML = '';

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
