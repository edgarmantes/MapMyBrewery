var $ = require('jquery')
/**********************************
Global variables
**********************************/
var locations = [];
var markerCount = 0;
var map = null;
var postal_search = 'https://dry-savannah-42122.herokuapp.com/';
var markers = [];

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
  $('.spinner').show();  //When page is loading and AJAX is gathering info, loading screen is present
  $.getJSON(postal_search, query, callback);
  // $('.spinner').hide();
}



/*********************************
Callback function for BrewerDB API AJAX
*********************************/

function displaySearchData(data) {
  locations = [];
  $('.js-list').remove();
  $('.sorry').remove();
  if (data.data === undefined){
    $('.spinner').fadeOut('slow');

    $('.list-container').fadeIn('slow');
    emptyList();
  } else {
    for (var i = 0; i < data.totalResults; i++){

      /*****************************
      vars for addMarkerToMap()
      *****************************/
      var lat = data.data[i].latitude;
      var lng = data.data[i].longitude;
      var title = data.data[i].brewery.name;
      var website = data.data[i].website;
      var organic = data.data[i].brewery.isOrganic;
      var address = data.data[i].streetAddress;
      var phone = data.data[i].phone;
      var index = i;
      var info = "<h1 class='popup'>" + title + "</h1><br><p class='pop-p'>Organic: " + organic + "<br><p class='pop-p'>" + address + "</p>" +
                "<br><a class='pop-p' href='tel:" + phone + "'>phone:  " + phone + "</><br><a href='" + website + 
                "' target='_blank'><p class='pop-p'>Check out our Webiste</p></a>";
      

      /******************************
      vars for renderHtmlList()
      ******************************/
      var website = data.data[i].website;
      addMarkerToMap(lat, lng, info);    //Adds a marker for each returned object
      
      $('.spinner').fadeOut('slow');           //Removes loading screen right before adding markers to make

      //renderHtmlList(title, website)
      renderHtmlList(title, website, index)
    }
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
  markers.push(marker);
    
  //Gives each marker an Id for the on click
  markerCount++;

  // Triggers click listener for infoWindow in results list
  $('.list-container').on('click', '.list-name', function(){
    var numString = $(this).attr('id');
    var num = parseInt(numString)
    console.log(markers)
    google.maps.event.trigger(markers[num], 'click');

  })

    $('.favs').on('click', '.list-name', function(){
    var numString = $(this).attr('id');
    var num = parseInt(numString)
    console.log(markers)
    google.maps.event.trigger(markers[num], 'click');

  })

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



/****************************************
Deletes all markers on the map after submitting new zip code query
*****************************************/
function deleteMarkers(){
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  };
  markers = [];
}


/*********************************
Render returned list onto list div on sidebar
*********************************/

function renderHtmlList(title, website, index){

  var list = $('<div>').addClass('js-list');
  var description = $('<div>').addClass('description description-block');
  var listName = $('<h4>').addClass('list-name').attr('id', index).html(title);
  var link = $('<a>').attr('href', '#').addClass('wind marker-link')
  var addTo = $('<button>').addClass('add').html('Save To List');

  var website = $(link).append(listName).append(addTo);
  var descript = $(description).append(website);
  var listed = $(list).append(descript);

  $('.list-container').fadeIn('slow');
  $('.places').after(listed);
}



function emptyList(){
  var say = $('<h4>').addClass('list-name sorry').append('Sorry! No breweries there... Try another place!')
  $('.places').after(say);
}





/*********************************
Event Listener
*********************************/

$(document).ready(function(){

  // Listener for fullpage call to action
  $('.full-page').on('click', '.full-submit', function(e) {
    e.preventDefault(); 
    $('.full-page').addClass('hidden');
    $('main').fadeIn('slow');
    //$('main').removeClass('hidden');
    var query = $(this).siblings().val();
    getDataFromApi(query, displaySearchData);
  });

  // Listener for map view 'More!' button
  $('.js-search-form').on('click', '.submit', function(e) {
    e.preventDefault(); 
    deleteMarkers();
    var query = $(this).siblings().val();
    getDataFromApi(query, displaySearchData);
  });

  // Listener for adding to list of interest
  $('.list-container').on('click', '.add', function(event){
    event.preventDefault();
    $('.favs').fadeIn('slow');
    var clone = $(this).closest('.js-list').clone().removeClass('js-list').addClass('added');;

    $('.favs').after().append(clone);
    $('.favs').find('.add').replaceWith('<button class="delete">Delete</button>')
  })

  //listener for deleting item from interest list
  $('.favs').on('click', '.delete', function(event){
    event.preventDefault();

    if ($('.favs').children().length !== 2) {
      $(this).closest('.added').detach();
      event.stopPropagation();
    } else {
      $(this).closest('.added').detach();
      event.stopPropagation();
      $('.favs').fadeOut('slow');
    }
  })

  // $(window).on('load', loading());
  $('.spinner').hide();

});
