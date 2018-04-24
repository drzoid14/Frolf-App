$('form').submit(function(e) {
  event.preventDefault();
    let locale=$('#searchbar').val();
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.foursquare.com/v2/venues/search?ll=35.8,-78.6&client_id=1R2KOI5C0RYHU5IPYW4WC32EROLJRQFJOEG5YPERNLMAL3GU&client_secret=VOLTI1HDXQJ1FSIRNCW3MA41WE4RHP3FBWAQGR22ZY4QWDEU&query=disc%20golf&v=20180323",
  "type": "GET",
  "part": "response"
  
  }


$.ajax(settings).done(function (data) {
  console.log(data);
  for(i=0;i<data.response.venues.length;i++){
    $(`.results`).append(`<div class = 'end'>${data.response.venues[i].name}</div>`);
  }
});
});
 