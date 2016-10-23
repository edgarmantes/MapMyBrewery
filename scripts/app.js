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
  locations = [];
  $('.js-list').remove();
  //setMapOnAll(null);
  for (var i = 0; i < data.totalResults; i++){

    /*****************************
    vars for addMarkerToMap()
    *****************************/
    var lat = data.data[i].latitude;
    var lng = data.data[i].longitude;
    var title = data.data[i].brewery.name;
    var address = data.data[i].streetAddress;
    var info = "<h1 class='popup'>" + title + "</h1><br><p>" + address + "</p>";
    

    /******************************
    vars for renderHtmlList()
    ******************************/
    var website = data.data[i].website;

    addMarkerToMap(lat, lng, info);    //Adds a marker for each returned object
    //renderHtmlList(title, website)
    renderHtmlList(title, website)
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
Render returned list onto list div on sidebar
*********************************/

function renderHtmlList(title, website){

  var list = $('<div>').addClass('js-list');
  var description = $('<div>').addClass('description description-block');
  var listName = $('<h4>').addClass('list-name').html(title);
  var link = $('<a>').attr('href', website).attr('target', '_blank');
  var addTo = $('<button>').addClass('add').html('Interested');

  var website = $(link).append(listName).append(addTo);
  var descript = $(description).append(website);
  var listed = $(list).append(descript);

  $('.list-container').removeClass('hidden');
  $('.places').after(listed);
}

/********************************
Added selected in Fav List
********************************/

function favs(e){
  console.log(e)
}


/*********************************
Event Listener
*********************************/

$(document).ready(function(){

  // Listener for fullpage call to action
  $('.full-page').on('click', '.full-submit', function(e) {
    e.preventDefault(); 
    $('.full-page').addClass('hidden');
    $('.outer').removeClass('hidden');
    var query = $(this).siblings().val();
    getDataFromApi(query, displaySearchData);
  });

  // Listener for map view 'More!' button
  $('.js-search-form').on('click', '.submit', function(e) {
    e.preventDefault(); 
    var query = $(this).siblings().val();
    getDataFromApi(query, displaySearchData);
  });

  // Listener for adding to list of interest
  $('.list-container').on('click', '.add', function(event){
    event.preventDefault();
    $('.favs').removeClass('hidden');
    var clone = $(this).closest('.js-list').clone().removeClass('js-list').addClass('added');;

    $('.favs').after().append(clone);
    $('.favs').find('.add').replaceWith('<button class="delete">Delete</button>')
  })

  //listener for deleting item from interest list
  $('.favs').on('click', '.delete', function(event){
    event.preventDefault();

    if ($('.favs').children().length !== 2) {
      console.log($('.favs').children().length);
      $(this).closest('.added').detach();
      event.stopPropagation();
    } else {
      $(this).closest('.added').detach();
      event.stopPropagation();
      $('.favs').addClass('hidden');
    }
  })

});
