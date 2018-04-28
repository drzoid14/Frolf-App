function makeWeather(lat, lon, locale) {
  var weatherSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.weatherbit.io/v2.0/current?key=2b4af8efa8cf40a590c218af015143a4&city=Raleigh%2CNC",
    "method": "GET"
  };


  if (lat&&lon) {
    weatherSettings.url = "https://api.weatherbit.io/v2.0/current?key=2b4af8efa8cf40a590c218af015143a4&lat="+lat+"&lon="+lon+"&units=I";
  } else {
    weatherSettings.url = "https://api.weatherbit.io/v2.0/current?key=2b4af8efa8cf40a590c218af015143a4&city="+locale+"&units=I"
    }

  $.ajax(weatherSettings).done(function (response) {
    console.log(response);
  })
}

function makeSearch(location, locale) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.foursquare.com/v2/venues/search?near=" + locale + "&client_id=1R2KOI5C0RYHU5IPYW4WC32EROLJRQFJOEG5YPERNLMAL3GU&client_secret=VOLTI1HDXQJ1FSIRNCW3MA41WE4RHP3FBWAQGR22ZY4QWDEU&query=disc%20golf&v=20180323",
    "type": "GET",
    "part": "response"
  }

  if (location) {
    settings.url = "https://api.foursquare.com/v2/venues/search?ll=" + location + "&client_id=1R2KOI5C0RYHU5IPYW4WC32EROLJRQFJOEG5YPERNLMAL3GU&client_secret=VOLTI1HDXQJ1FSIRNCW3MA41WE4RHP3FBWAQGR22ZY4QWDEU&query=disc%20golf&v=20180323"

  } else {
    settings.url = "https://api.foursquare.com/v2/venues/search?near=" + locale + "&client_id=1R2KOI5C0RYHU5IPYW4WC32EROLJRQFJOEG5YPERNLMAL3GU&client_secret=VOLTI1HDXQJ1FSIRNCW3MA41WE4RHP3FBWAQGR22ZY4QWDEU&query=disc%20golf&v=20180323"
  }

  $.ajax(settings).done(function (data) {
    console.log(data);
    $(`.results`).empty();

    for (i = 0; i < data.response.venues.length; i++) {
      if (data.response.venues[i].categories.length>0 && data.response.venues[i].categories[0].name === "Disc Golf")
        $(`.results`).append(`<div class = 'end'>${data.response.venues[i].name}</div>`);
    }
  });
}

function showPosition(position) {
  var location = position.coords.latitude + "," + position.coords.longitude;
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  makeSearch(location, null);
  makeWeather(lat, lon, null);
}

function receiveError(error) {
  console.log(error);
}

$(function () {
  if (navigator.geolocation); {
    navigator.geolocation.getCurrentPosition(showPosition, receiveError);
  }
})



$('form').submit(function (event) {
  event.preventDefault();
  let locale = $('#searchbar').val();
  makeSearch(null, locale)
  makeWeather(null, null, locale);


});
