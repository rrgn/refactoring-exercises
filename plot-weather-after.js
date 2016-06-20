var mapElm = document.getElementById('map');
var map = new google.maps.Map(mapElm, {
  center: {lat: 33.748995, lng: -84.387982},
  zoom: 4
});
var geocoder = new google.maps.Geocoder();

getCities(function(cities) {
  cities.forEach(function(city) {
    geocoder.geocode({ address: city.name }, function(data) {
      plotMarker(city, data);
    });
  });
});

function getCities(callback) {
  $.ajax({
    url: 'cities.json',
    success: function(cities) {
      callback(cities);
    }
  });
}

function plotMarker(city, geocodeResults) {
  var latLng = geocodeResults[0].geometry.location;
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  marker.addListener('click', function() {
    getWeatherForCity(city.name, function(geocodeResults) {
        openWeatherInfoWindow(geocodeResults, marker);
    });
  });
}

function getWeatherForCity(cityName, callback) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    method: 'GET',
    data: {
      q: cityName,
      units: 'imperial',
      APPID: 'eac2948bfca65b78a8c5564ecf91d00e'
    },
    success: function(data) {
      callback(data);
    }
  });
}

function openWeatherInfoWindow(weatherData, marker) {
  var content = '<h1>' + weatherData.name + '</h1>' +
    'Temperature: ' + weatherData.main.temp + '°<br>' +
    'Hi: ' + weatherData.main.temp_max + '°<br>' +
    'Lo: ' + weatherData.main.temp_min + '°<br>' +
    weatherData.weather[0].description + '<br>' +
    '<img src="http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png">';
  var infoWindow = new google.maps.InfoWindow({
    content: content
  });
  infoWindow.open(map, marker);
}
