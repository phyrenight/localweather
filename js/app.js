
// Think about breaking this up into two functions one for the api and the other place items in the DOM
var getWeather = function(locaCoords){
  /*
    args: an object containing the user's coordinates
    function: displays the users current weather
  */
  var temp = "";
  var $temp = $("#temp");
  var $weather = $("#weather");
  var $location = $("#location");
	var openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather";
	var openWeatherApiId = "f5b9a4274f04681ec6cb1740b22733a9";
	var coords = "?lat="+ locaCoords.lat + "&lon=" + locaCoords.lng;
	openWeatherUrl = openWeatherUrl + coords+"&APPID=" + openWeatherApiId;
	$temp.append(openWeatherUrl);
	$.getJSON( openWeatherUrl, function(data) {
		var city = data.name;
		var country = data.sys.country;
		var location = city + ", " + country;
		var icon = data.weather[0].icon;
		var weather = data.weather[0].main;
		var iconUrl = "http://openweathermap.org/img/w/" + icon;
		var iconLink = "<img src='" + iconUrl + ".png'alt='" + weather + "' title='" + weather + "'>";
	  temp = kelvinToCelsius(data.main.temp);
	  addBackground(weather);
	  $weather.empty().append(iconLink);
	  $temp.empty().append(temp);
	  $location.empty().append(location);
	});
};

var addBackground = function(condition){
  /*
    args: a string
    function: displays a background based off of the current weather
  */
  var imgURL = "";
  if(condition == "Rain"){
    imgURL = "http://onehdwallpaper.com/wp-content/uploads/2015/06/Rain-Falling-Desktop-Backgrounds.jpg";
  }
  else if(condition == "Snow"){
  	imgURL = "http://feelgrafix.com/data_images/out/8/813293-free-snow-wallpaper.jpg";
  }
  else if(condition == "Clear"){
  	imgURL = "http://www.dundeewestfest.org/wp-content/uploads/2016/04/813639-free-sunny-day-wallpaper-1.jpg";
  }
  else if(condition == "Clouds"){
  	imgURL = "http://www.rejijoseph.com/wp-content/uploads/2016/06/Free-stock-photo-of-Cloudy-Sky-Sea-Picture-00001.jpg";
  }
  else{
  	imgURL = "http://www.publicdomainpictures.net/pictures/70000/velka/stars-in-the-night-sky.jpg";
  }
  $("#body").css("background-image", "url(" + imgURL + ")");
};

var kelvinToCelsius = function(temp){
  /*
    args: string of numbers representing a temp in kelvin
    function: converts kelvin to celsius
    returns: a number representing a celsius temp
  */
	return (temp - 273.15).toFixed(2) + " C";
};

var changeMetric = function(){
  /*
    function: converts temps from celsius to fahrenheit and fahrenheit to celsius
    returns: a string that contains the temp and the Degree letter 
  */
  var temp = "";
  var tempContent = "";
	var $temp = $("#temp");
  var $DOMTemp = $temp.html();
  var lst = $DOMTemp.split(" ");
  var tempMetric = lst[1];
  if(tempMetric == "C"){
  	tempMetric = "F";
  	temp = (parseFloat(lst[0]) * 9/5 + 32).toFixed(2);
  }else {
  	tempMetric = "C";
  	temp = ((parseFloat(lst[0]) - 32) / (9/5)).toFixed(2);
  }
  tempContent = temp + " " + tempMetric;
  $temp.empty().append(tempContent);
};

function getLocation() {
  /*
    function: makes an api call to freegeoip.net  to get the users coordinates
    returns: an object with the users longitude and latitude
  */
  var IPURL = "http://freegeoip.net/json/";
  $.getJSON(IPURL, function(result){
    var locaCoords = {
    lng:result.longitude,
    lat: result.latitude
    };
  getWeather(locaCoords);
  });
}
