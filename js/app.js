var getWeather = function(locaCoords){
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
  $("#article").css("background-image", "url(" + imgURL + ")");
};

var kelvinToCelsius = function(temp){
	return (temp - 273.15).toFixed(2) + " C";
};

var changeMetric = function(){
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
  var IPURL = "http://freegeoip.net/json/";
  $.getJSON(IPURL, function(result){
    var locaCoords = {
    lng:result.longitude,
    lat: result.latitude
    };
  getWeather(locaCoords);
  });
}
