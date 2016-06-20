function main() {
  var mapElm = document.getElementById('map');
  var map = new google.maps.Map(mapElm, {
    center: {lat: 33.748995, lng: -84.387982},
    zoom: 4
  });
  var geocoder = new google.maps.Geocoder();

  getCities(geocoder, map);






}
main();

function infoData(data, marker, map) {
  var content = '<h1>' + data.name + '</h1>' +
    'Temperature: ' + data.main.temp + '°<br>' +
    'Hi: ' + data.main.temp_max + '°<br>' +
    'Lo: ' + data.main.temp_min + '°<br>' +
    data.weather[0].description + '<br>' +
    '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">';
    var infoWindow = new google.maps.InfoWindow({
    content: content
  });
  infoWindow.open(map, marker);
}

function getCities(geocoder, map) {
  $.ajax({
    url: 'cities.json',
    success: function(cities) {
      cities.forEach(function(city) {
        geocoder.geocode({ address: city.name }, function(data) {
          var latLng = data[0].geometry.location;
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
          someInfoWindow(map, marker, city);
        });
      });
      console.log(cities);
    }
  });
}

function someInfoWindow(map, marker, city) {
  marker.addListener('click', function() {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      method: 'GET',
      data: {
        q: city.name,
        units: 'imperial',
        APPID: 'eac2948bfca65b78a8c5564ecf91d00e'
      },
      success: function(data) {
        infoData(data, marker, map);

      }
    });
  });
}
