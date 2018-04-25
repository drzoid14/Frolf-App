

function makeSearch(location,locale) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.foursquare.com/v2/venues/search?near=" + locale + "&client_id=1R2KOI5C0RYHU5IPYW4WC32EROLJRQFJOEG5YPERNLMAL3GU&client_secret=VOLTI1HDXQJ1FSIRNCW3MA41WE4RHP3FBWAQGR22ZY4QWDEU&query=disc%20golf&v=20180323",
    "type": "GET",
    "part": "response"
  } 
  
  if(location){
    settings.url="https://api.foursquare.com/v2/venues/search?ll=" + location + "&client_id=1R2KOI5C0RYHU5IPYW4WC32EROLJRQFJOEG5YPERNLMAL3GU&client_secret=VOLTI1HDXQJ1FSIRNCW3MA41WE4RHP3FBWAQGR22ZY4QWDEU&query=disc%20golf&v=20180323"
    
  } else{
    settings.url="https://api.foursquare.com/v2/venues/search?near=" + locale + "&client_id=1R2KOI5C0RYHU5IPYW4WC32EROLJRQFJOEG5YPERNLMAL3GU&client_secret=VOLTI1HDXQJ1FSIRNCW3MA41WE4RHP3FBWAQGR22ZY4QWDEU&query=disc%20golf&v=20180323"
  }

  $.ajax(settings).done(function (data) {
    console.log(data);
    $(`.results`).empty();
    for (i = 0; i < data.response.venues.length; i++) {
      $(`.results`).append(`<div class = 'end'>${data.response.venues[i].name}</div>`);
    }
  });
}
function showPosition(position){
  var location = position.coords.latitude+","+position.coords.longitude;
  makeSearch(location, null);
}
$(function () {
  if (navigator.geolocation); {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
})

$('form').submit(function (event) {
  event.preventDefault();
  let locale = $('#searchbar').val();
  makeSearch(null,locale)


});
