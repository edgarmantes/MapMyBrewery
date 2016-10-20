/**********************************
Global variables
**********************************/
var locations = [];
var markerCount = 0;
var map = null;
var postal_search = 'https://dry-savannah-42122.herokuapp.com/';


/*********************************
Callback function for GoogleMaps API
*********************************/

function initMap() {
  var uluru = {lat: 41.8781, lng: -87.6298};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: uluru
  });
}

/**********************************
BreweryDB API Code
**********************************/

function getDataFromApi(searchTerm, callback) {
  var query = {
    key: '8ea35ba681e47e9437e67134692a65b5',
    postalCode: searchTerm,    
  }
  $.getJSON(postal_search, query, callback);
}



/*********************************
Callback function for BrewerDB API AJAX
*********************************/

function displaySearchData(data) {
  for (var i = 0; i < data.totalResults; i++){

    var lat = data.data[i].latitude;
    var lng = data.data[i].longitude;
    var title = data.data[i].name;
    var info = "<h1>" + data.data[i].name + "</h1>";
   
    addMarkerToMap(lat, lng, info);    //Adds a marker for each returned object
  }
}


/*********************************
function that renders new markers to the map
*********************************/

function addMarkerToMap(lat, long, htmlMarkupForInfoWindow){
  var infowindow = new google.maps.InfoWindow();
  var myLatLng = new google.maps.LatLng(lat, long);
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    animation: google.maps.Animation.DROP,
  });
    
  //Gives each marker an Id for the on click
  markerCount++;

  //Creates the event listener for clicking the marker
  //and places the marker on the map 
  google.maps.event.addListener(marker, 'click', (function(marker, markerCount) {
    return function() {
      infowindow.setContent(htmlMarkupForInfoWindow);
      infowindow.open(map, marker);
    }
  })(marker, markerCount));  
  
  //Pans map to the new location of the marker
  map.panTo(myLatLng)        
}




/*********************************
Event Listener
*********************************/

$(document).ready(function(){
  $('.js-search-form').on('click', '.submit', function(e) {
    e.preventDefault(); 
    var query = $(this).siblings().val();
    getDataFromApi(query, displaySearchData);
  });
});
