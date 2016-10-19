/**********************************
Google Maps API Code
**********************************/
function initMap() {
  var uluru = {lat: 41.8781, lng: -87.6298};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: uluru
  });
  // var marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map
  // });
}




/**********************************
BreweryDB API Code
**********************************/


var postal_search = 'https://dry-savannah-42122.herokuapp.com/';

function getDataFromApi(searchTerm, callback) {
  var query = {
    key: '8ea35ba681e47e9437e67134692a65b5',
    postalCode: searchTerm,    
  }
  $.getJSON(postal_search, query, callback);
}


/*********************************
Constructor Function
*********************************/



function displaySearchData(data) {
  var locations = [];
  for (var i = 0; i < data.totalResults; i++){
    // var lat = data.data[i].latitude;
    // var lng = data.data[i].longitude;
    // var title = data.data[i].name;
    // var info = data.data[i].name;

    var myLatLng = {lat, lng};
    var mapOptions = {
      zoom: 13,
      center: myLatLng
    }

    locations += myLatLng;
  }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: title,
      infoWindow: {content: info}
    });
}

function watchSubmit() {
  $('.js-search-form').on('click', '.submit', function(e) {
    e.preventDefault(); 
    var query = $(this).siblings().val();
    getDataFromApi(query, displaySearchData);
  });

}

$(document).ready(function(){
  watchSubmit();
});






/**********************************
BreweryDB API Example Return
**********************************/

var example = {
  "currentPage": 1,
  "numberOfPages": 1,
  "totalResults": 3,
  "data": [
    {
      "id": "3IBs1S",
      "name": "Baderbrau Brewery",
      "streetAddress": "2515 S Wabash Ave",
      "locality": "Chicago",
      "region": "Illinois",
      "postalCode": "60616",
      "website": "http://www.baderbrau.com",
      "latitude": 41.846963,
      "longitude": -87.624831,
      "isPrimary": "Y",
      "inPlanning": "N",
      "isClosed": "N",
      "openToPublic": "Y",
      "locationType": "micro",
      "locationTypeDisplay": "Micro Brewery",
      "countryIsoCode": "US",
      "status": "verified",
      "statusDisplay": "Verified",
      "createDate": "2014-05-29 10:57:42",
      "updateDate": "2015-06-16 13:35:47",
      "breweryId": "LZmXC8",
      "brewery": {
        "id": "LZmXC8",
        "name": "Baderbräu",
        "nameShortDisplay": "Baderbräu",
        "description": "Chicago's Original Craft Beer",
        "website": "http://www.baderbrau.com",
        "mailingListUrl": "www.baderbrau.com/contact",
        "isOrganic": "N",
        "images": {
          "icon": "https://s3.amazonaws.com/brewerydbapi/brewery/LZmXC8/upload_dQX3aP-icon.png",
          "medium": "https://s3.amazonaws.com/brewerydbapi/brewery/LZmXC8/upload_dQX3aP-medium.png",
          "large": "https://s3.amazonaws.com/brewerydbapi/brewery/LZmXC8/upload_dQX3aP-large.png",
          "squareMedium": "https://s3.amazonaws.com/brewerydbapi/brewery/LZmXC8/upload_dQX3aP-squareMedium.png",
          "squareLarge": "https://s3.amazonaws.com/brewerydbapi/brewery/LZmXC8/upload_dQX3aP-squareLarge.png"
        },
        "status": "verified",
        "statusDisplay": "Verified",
        "createDate": "2014-05-29 10:57:05",
        "updateDate": "2015-12-22 15:54:23"
      },
      "country": {
        "isoCode": "US",
        "name": "UNITED STATES",
        "displayName": "United States",
        "isoThree": "USA",
        "numberCode": 840,
        "createDate": "2012-01-03 02:41:33"
      }
    },
    {
      "id": "Zwlamt",
      "name": "Main Brewery",
      "streetAddress": "1454 S Michigan Ave, Suite 1",
      "locality": "Chicago",
      "region": "Illinois",
      "postalCode": "60616",
      "phone": "(312) 291-9022",
      "website": "http://vicedistrictbrewing.com",
      "latitude": 41.8624915,
      "longitude": -87.624341,
      "isPrimary": "N",
      "inPlanning": "N",
      "isClosed": "N",
      "openToPublic": "Y",
      "locationType": "micro",
      "locationTypeDisplay": "Micro Brewery",
      "countryIsoCode": "US",
      "status": "verified",
      "statusDisplay": "Verified",
      "createDate": "2014-09-07 13:53:49",
      "updateDate": "2014-09-07 17:51:53",
      "breweryId": "blq7Dn",
      "brewery": {
        "id": "blq7Dn",
        "name": "Vice District Brewing Co.",
        "nameShortDisplay": "Vice District",
        "website": "http://www.vicedistrictbrewing.com/",
        "isOrganic": "N",
        "status": "verified",
        "statusDisplay": "Verified",
        "createDate": "2014-09-07 13:53:48",
        "updateDate": "2015-12-22 15:58:37"
      },
      "country": {
        "isoCode": "US",
        "name": "UNITED STATES",
        "displayName": "United States",
        "isoThree": "USA",
        "numberCode": 840,
        "createDate": "2012-01-03 02:41:33"
      }
    },
    {
      "id": "9pjSvK",
      "name": "Main Brewery",
      "streetAddress": "2001 S Calumet Ave",
      "extendedAddress": "#302",
      "locality": "Chicago",
      "region": "Illinois",
      "postalCode": "60616",
      "phone": "574-520-9981",
      "latitude": 41.85551,
      "longitude": -87.618925,
      "isPrimary": "Y",
      "inPlanning": "N",
      "isClosed": "N",
      "openToPublic": "Y",
      "locationType": "micro",
      "locationTypeDisplay": "Micro Brewery",
      "countryIsoCode": "US",
      "status": "verified",
      "statusDisplay": "Verified",
      "createDate": "2012-01-03 02:41:53",
      "updateDate": "2014-07-23 19:11:34",
      "breweryId": "Z2x0hV",
      "brewery": {
        "id": "Z2x0hV",
        "name": "Elevated Brewing Co",
        "nameShortDisplay": "Elevated",
        "isOrganic": "N",
        "status": "verified",
        "statusDisplay": "Verified",
        "createDate": "2012-01-03 02:41:53",
        "updateDate": "2015-12-22 15:18:49"
      },
      "country": {
        "isoCode": "US",
        "name": "UNITED STATES",
        "displayName": "United States",
        "isoThree": "USA",
        "numberCode": 840,
        "createDate": "2012-01-03 02:41:33"
      }
    }
  ],
  "status": "success"
}