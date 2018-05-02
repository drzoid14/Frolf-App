function setBackground(response) {
  var current = response.data[0].weather.description;
  console.log(current);
  $(`.weather`).append(`${current}`);
  if (current.toLowerCase().includes("thunderstorm")) {
    $('body').css('background-image', 'url(http://vunature.com/wp-content/uploads/2016/11/sky-rain-storm-thunderstorm-nature-clouds-lightning-wallpaper-for-desktop-full-size-free-download.jpg)');
  } else {
    if (current.toLowerCase().includes("clear")) {
      $('body').css('background-image', 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Iubalw-RYjADFRtECVne0RA0O2lrbZcF0Ildr7SfUNEOoA1UKg)');
    } else {
      if (current.toLowerCase().includes("rain") || current.toLowerCase().includes("drizzle") || current.toLowerCase().includes("precipitation")) {
        $('body').css('background-image', 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTecF7UU7E9mGwmwf4Jmhdy2U9sK2Rgxs_ezbSMn1lmv1u7toQ0)');
      } else {
        if (current.toLowerCase().includes("snow") || current.toLowerCase().includes("flurries")) {
          $('body').css('background-image', 'url(https://www.social-graphics.com/twitter-images/snowy-background.jpg)');
        } else {
          if (current.toLowerCase().includes("fog") || current.toLowerCase().includes("haze") || current.toLowerCase().includes("smoke") || current.toLowerCase().includes("sand") || current.toLowerCase().includes("mist")) {
            $('body').css('background-image', 'url(http://www.triciamccallum.com/writer/wp-content/uploads/Pier-in-Fog-870x400.jpg)');
          } else {
            if (current.toLowerCase().includes("cloud")) {
              $('body').css('background-image', 'url(http://www.desktopwallpaperhd.net/wallpapers/1/0/desktop-oregon-background-joseph-partly-sky-cloudy-18624.jpg)');
            }

          }
        }
      }
    }
  }
}

function makeWeather(lat, lon, locale) {
  var weatherSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.weatherbit.io/v2.0/current?key=2b4af8efa8cf40a590c218af015143a4&city=Raleigh%2CNC",
    "method": "GET"
  };


  if (lat && lon) {
    weatherSettings.url = "https://api.weatherbit.io/v2.0/current?key=2b4af8efa8cf40a590c218af015143a4&lat=" + lat + "&lon=" + lon + "&units=I";
  } else {
    weatherSettings.url = "https://api.weatherbit.io/v2.0/current?key=2b4af8efa8cf40a590c218af015143a4&city=" + locale + "&units=I"
  }

  $.ajax(weatherSettings).done(function (response) {
    console.log(response);


    $(`.weather`).html(`<div class="temp">${response.data[0].app_temp} F</div>`);
    $(`.weather`).append(`<div class="wind">${response.data[0].wind_spd} mph</div>`);
    setBackground(response);
  })



}

function initMap(places) {
  console.log(places);
  if(!places){return};
  var bounds=new google.maps.LatLngBounds();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8

  });
  i=0;
  places.forEach(function(item){
    if (item.categories.length > 0 && item.categories[0].name === "Disc Golf"){
    i+=1;
    var marker = new google.maps.Marker({
      position: {lat: item.location.lat, lng: item.location.lng},
      map: map,
      title:item.name,
      label:`${i}`
    });
    bounds.extend({lat: item.location.lat, lng: item.location.lng});
  }})
map.fitBounds(bounds);
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
      if (data.response.venues[i].categories.length > 0 && data.response.venues[i].categories[0].name === "Disc Golf") 
      $(`.results`).append(`<div class = 'end'>
        <span class="title">
        <a href="https://foursquare.com/v/${data.response.venues[i].id}" target="_new">
        ${i+1}: ${data.response.venues[i].name}</a>
        </span><br/>
        <span class="address">${data.response.venues[i].location.formattedAddress}</span>
        </div>`);
        
    }
  
    initMap(data.response.venues);
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
  console.log("hi");


});
