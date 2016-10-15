
function initMap() {            //Callback function that is passed to the AJAX request on initial load
  var markerArray = [];

  // Instantiate a directions service.
  var directionsService = new google.maps.DirectionsService;

  // Create a map and center it on Manhattan.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 40.771, lng: -73.974}
  });

  // Create a renderer for directions and bind it to the map.
  var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

  // Instantiate an info window to hold step text.
  var stepDisplay = new google.maps.InfoWindow;

  // Display the route between the initial start and end selections.
  calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
  
  // Listen to change events from the start and end lists.
  var onChangeHandler = function() {
    calculateAndDisplayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsDisplay, directionsService,
    markerArray, stepDisplay, map) {
  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'WALKING'
  }, function(response, status) {
    // Route the directions and pass the response to a function to create
    // markers for each step.
    if (status === 'OK') {
      document.getElementById('warnings-panel').innerHTML =
          '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      showSteps(response, markerArray, stepDisplay, map);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
        stepDisplay, marker, myRoute.steps[i].instructions, map);
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}




/************************************/ 



// //geolocationPage
// var x = document.getElementById("geoLocation");
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude; 
// }

// $(document).on('click', '#getGeolocation', function(){
//     console.log("clicked");
//     getLocation();
// });

// //map page
// var y = document.getElementById("map-canvas");
// var mapLatitude;
// var mapLongitude;
// var myLatlng;

// function getMapLocation() {
//   console.log("getMapLocation");
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showMapPosition);
//     } else {
//         y.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
// function showMapPosition(position) {
//   console.log("showMapPosition");
//     mapLatitude = position.coords.latitude;
//     mapLongitude = position.coords.longitude;
//     myLatlng = new google.maps.LatLng(mapLatitude,mapLongitude);
//     getMap();
// }


// var map;
// function getMap() {
//   console.log("getMap");
//   var mapOptions = {
//     zoom: 12,
//     center: new google.maps.LatLng(mapLatitude, mapLongitude)
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);

//   var marker = new google.maps.Marker({
//       position: myLatlng,
//       map: map,
//       title:"You are here!"
//   });
// }

// $( document ).on( "pageshow", "#mapPage", function( event ) {
//   getMapLocation();
// });

// //directionsPage
// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();
// var directionsMap;
// var z = document.getElementById("directions-canvas");
// var start;
// var end;

// function getDirectionsLocation() {
//   console.log("getDirectionsLocation");
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showDirectionsPosition);
//     } else {
//         z.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// function showDirectionsPosition(position) {
//   console.log("showDirectionsPosition");
//     directionsLatitude = position.coords.latitude;
//     directionsLongitude = position.coords.longitude;
//     directionsLatLng = new google.maps.LatLng(directionsLatitude,directionsLongitude);
//     getDirections();
// }

// function getDirections() {
//   console.log('getDirections');
//   directionsDisplay = new google.maps.DirectionsRenderer();
//   //start = new google.maps.LatLng(directionsLatLng);
//   var directionsOptions = {
//     zoom:12,
//     center: start
//   }
//   directionsMap = new google.maps.Map(document.getElementById("directions-canvas"), directionsOptions);
//   directionsDisplay.setMap(directionsMap);
//   calcRoute();
// }

// function calcRoute() {
//   console.log("calcRoute");
//   start = directionsLatLng;
//   end = "50 Rue Ste-Catherine O Montréal, QC H2X 1Z6";
//   var request = {
//     origin:start,
//     destination:end,
//     travelMode: google.maps.TravelMode.TRANSIT
//   };
//   directionsService.route(request, function(result, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(result);
//     }
//   });
// }

// $( document ).on( "pageshow", "#directionsPage", function( event ) {
//   getDirectionsLocation();
// });