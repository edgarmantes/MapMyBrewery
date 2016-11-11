'use strict'
const $ = require('jquery');
/**********************************
Global variables
**********************************/

// let locations = [];
// let markerCount = 0;

// const postal_search = 'https://dry-savannah-42122.herokuapp.com/';
// let markers = [];

/*********************************
Callback function for GoogleMaps API
*********************************/



/**********************************
BreweryDB API Code
**********************************/

// function getDataFromApi(searchTerm, callback) {
//   let query = {
//     key: '8ea35ba681e47e9437e67134692a65b5',
//     postalCode: searchTerm,    
//   }
//   $('.spinner').show();  //When page is loading and AJAX is gathering info, loading screen is present
//   $.getJSON(postal_search, query, callback);
// }



/*********************************
Callback function for BrewerDB API AJAX
*********************************/

// function displaySearchData(data) {
//   $('.js-list').remove(); //clearview()
//   $('.sorry').remove();
//   if (data.data === undefined){
//     $('.spinner').fadeOut('slow');
//     $('.list-container').fadeIn('slow');
//     emptyList();
//   } else {
//     for (var i = 0; i < data.totalResults; i++){

//       /*****************************
//       vars for addMarkerToMap()
//       *****************************/
//       // let lat = data.data[i].latitude;
//       // let lng = data.data[i].longitude;
//       // let title = data.data[i].brewery.name;
//       // let website = data.data[i].website;
//       // let organic = data.data[i].brewery.isOrganic;
//       // let address = data.data[i].streetAddress;
//       // let phone = data.data[i].phone;
//       // let index = i;
//       // let info = "<h1 class='popup'>" + title + "</h1><br><p class='pop-p'>Organic: " + organic + "<br><p class='pop-p'>" + address + "</p>" +
//       //           "<br><a class='pop-p' href='tel:" + phone + "'>phone:  " + phone + "</><br><a href='" + website + 
//       //           "' target='_blank'><p class='pop-p'>Check out our Webiste</p></a>";
      

//       /******************************
//       vars for renderHtmlList()
//       ******************************/
//       addMarkerToMap(lat, lng, info);    //Adds a marker for each returned object

//       $('.spinner').fadeOut('slow');           //Removes loading screen right before adding markers to make

//       renderHtmlList(title, website, index)
//     }
//   }
// }




/*********************************
function that renders new markers to the map
*********************************/

// function addMarkerToMap(lat, long, htmlMarkupForInfoWindow){
//   let infowindow = new google.maps.InfoWindow();
//   let myLatLng = new google.maps.LatLng(lat, long);
//   let marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     animation: google.maps.Animation.DROP,
//   });
//   markers.push(marker);
    
//   //Gives each marker an Id for the on click
//   markerCount++;

//   // Triggers click listener for infoWindow in results list
//   $('.list-container').on('click', '.list-name', function(){
//     let numString = $(this).attr('id');
//     let num = parseInt(numString)
//     console.log(markers)
//     google.maps.event.trigger(markers[num], 'click');

//   })

//     $('.favs').on('click', '.list-name', function(){
//     let numString = $(this).attr('id');
//     let num = parseInt(numString)
//     console.log(markers)
//     google.maps.event.trigger(markers[num], 'click');

//   })

//   //Creates the event listener for clicking the marker
//   //and places the marker on the map 
//   google.maps.event.addListener(marker, 'click', (function(marker, markerCount) {

//     return function() {
//       infowindow.setContent(htmlMarkupForInfoWindow);
//       infowindow.open(map, marker);
//     }
//   })(marker, markerCount)); 

//   console.log(map)
//   //Pans map to the new location of the marker
//   map.panTo(myLatLng)   

// }



/****************************************
Deletes all markers on the map after submitting new zip code query
*****************************************/
// function deleteMarkers(){
//   for (let i = 0; i < markers.length; i++) {
//     markers[i].setMap(null)
//   };
//   markers = [];
// }


/*********************************
Render returned list onto list div on sidebar
*********************************/

// function renderHtmlList(title, website, index){

//   let list = $('<div>').addClass('js-list');
//   let description = $('<div>').addClass('description description-block');
//   let listName = $('<h4>').addClass('list-name').attr('id', index).html(title);
//   let link = $('<a>').attr('href', '#').addClass('wind marker-link')
//   let addTo = $('<button>').addClass('add').html('Save To List');

//   let web = $(link).append(listName).append(addTo);
//   let descript = $(description).append(web);
//   let listed = $(list).append(descript);

//   $('.list-container').fadeIn('slow');
//   $('.places').after(listed);
// }



// function emptyList(){
//   let say = $('<h4>').addClass('list-name sorry').append('Sorry! No breweries there... Try another place!')
//   $('.places').after(say);
// }





/*********************************
Event Listener
*********************************/

// $(document).ready(function(){

//   // Listener for fullpage call to action
//   // $('.full-page').on('click', '.full-submit', function(e) {
//   //   e.preventDefault(); 
//   //   $('.full-page').addClass('hidden');
//   //   $('main').fadeIn('slow');
//   //   var query = $(this).siblings().val();
//   //   getDataFromApi(query, displaySearchData);
//   // });

//   // Listener for map view 'More!' button
//   $('.js-search-form').on('click', '.submit', function(e) {
//     e.preventDefault(); 
//     deleteMarkers();
//     var query = $(this).siblings().val();
//     getDataFromApi(query, displaySearchData);
//   });

//   // Listener for adding to list of interest
//   $('.list-container').on('click', '.add', function(event){
//     event.preventDefault();
//     $('.favs').fadeIn('slow');
//     var clone = $(this).closest('.js-list').clone().removeClass('js-list').addClass('added');;

//     $('.favs').after().append(clone);
//     $('.favs').find('.add').replaceWith('<button class="delete">Delete</button>')
//   })

//   //listener for deleting item from interest list
//   $('.favs').on('click', '.delete', function(event){
//     event.preventDefault();

//     if ($('.favs').children().length !== 2) {
//       $(this).closest('.added').detach();
//       event.stopPropagation();
//     } else {
//       $(this).closest('.added').detach();
//       event.stopPropagation();
//       $('.favs').fadeOut('slow');
//     }
//   })

//   // $(window).on('load', loading());
//   $('.spinner').hide();

// });
