var tempMetric = 'C';
var temp = ""

var getWeather = function(locaCoords){//lng,lat){
  var locationCoords = [];
	//locationCoords = getLocation().then(function());
  console.log(locaCoords);
  var $temp = $("#temp");
  var $weather = $("#weather");
  var $location = $("#location");
	var openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather";
	var openWeatherApiId = "f5b9a4274f04681ec6cb1740b22733a9";
	var coords = "?lat="+locaCoords.lat+"&lon="+locaCoords.lng;
	openWeatherUrl = openWeatherUrl + coords+"&APPID=" + openWeatherApiId;
	$temp.append(openWeatherUrl)
	$.getJSON( openWeatherUrl, function(data) {
		var  city = data.name
		var country = data.sys.country
		var location = city+", "+ country
		var icon = data.weather[0].icon;
		var weather = data.weather[0].main;
		var iconUrl = "http://openweathermap.org/img/w/" + icon;
		var iconLink = "<img src='"+ iconUrl + ".png'alt='"+weather+"' title='"+weather+"'>"
	  temp = kelvinToCelsius(data.main.temp);
	  addBackground(weather);
	  $weather.empty().append(iconLink);
	  $temp.empty().append(temp+ " "+tempMetric);
	  $location.empty().append(location);
	  console.log(city+" , "+country);
	});
}

var addBackground = function(condition){
  var $body = $("body");
  var imgURL = "";
  console.log($body)
  if(condition == 'Rain'){
    imgURL = "http://onehdwallpaper.com/wp-content/uploads/2015/06/Rain-Falling-Desktop-Backgrounds.jpg"
    console.log("rain")
  }
  else if(condition == 'Snow'){
  	imgURL = "http://feelgrafix.com/data_images/out/8/813293-free-snow-wallpaper.jpg"
    console.log("snow")
  }
  else if(condition == 'Clear'){
  	imgURL = "http://www.dundeewestfest.org/wp-content/uploads/2016/04/813639-free-sunny-day-wallpaper-1.jpg"
    console.log("Clear")
  }
  else if(condition == 'Clouds'){
  	imgURL = "http://www.rejijoseph.com/wp-content/uploads/2016/06/Free-stock-photo-of-Cloudy-Sky-Sea-Picture-00001.jpg"
    console.log("clouds")
  }
  else{
  	imgURL = "http://www.publicdomainpictures.net/pictures/70000/velka/stars-in-the-night-sky.jpg"
    console.log("everything else")
  }
  $body.css('background-image', 'url('+imgURL+')');
}

var kelvinToCelsius = function(temp){
	return (temp - 273.15).toFixed(2);
}
var changeMetric = function(){
	var temp2 = document.getElementById("temp").value
	var $temp = $("#temp");
	console.log(temp);
	console.log($temp)
  if(tempMetric == 'C'){
  	tempMetric = 'F';
  	temp = (temp * 9/5 + 32).toFixed(2);
  	//$temp.empty().append(temp);
  }else {
  	tempMetric = "C";
  	temp = ((temp - 32) / (9/5)).toFixed(2);
  	//$temp.empty().append(temp);
  }
  tempContent = temp + " "+tempMetric;
  $temp.empty().append(tempContent)
  //console.log((20 * 9/5 + 32).toFixed(2));
}


var $x = $("#location");

function getLocation() {
  var lat = 0;
  console.log("What the Hell!")
  var lon = 0;
  var IPURL = "http://freegeoip.net/json/";
  $.getJSON(IPURL, function(result){
    console.log(result.longitude)
    console.log("llllll")
    var locaCoords = {
    lng:result.longitude,
    lat: result.latitude
    }
  getWeather(locaCoords);
  });
 // getWeather(lat,lon);
}


 /* if (navigator.geolocation) {
    locations();
  } else {
   $x.empty().append("Geolocation is not supported by browser.");
  }
}*/
/*function locations(){
  var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };
  navigator.geolocation.getCurrentPosition(success, error, options)
}*/

function success(pos){
  var lng = pos.lon;
  var lat = pos.lat;
  getWeather(lng,lat)
  console.log(lng)
}
/*
function error(err){
  $x.empty().append("something went wrong "+ err.code);
}*/