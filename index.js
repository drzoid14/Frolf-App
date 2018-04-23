$('form').submit(function(e) {
  event.preventDefault();
    let locale=$('#searchbar').val();
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.foursquare.com/v2/venues/explore&client_id=1R2KOI5C0RYHU5IPYW4WC32EROLJRQFJOEG5YPERNLMAL3GU&client_secret=VOLTI1HDXQJ1FSIRNCW3MA41WE4RHP3FBWAQGR22ZY4QWDEU&query=disc%20golf&v=20180323&ll=35.863243800000006%2C%20-78.6227746",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "8e1717ed-cf30-3a7c-2e6a-4baa2d378806"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
});
 