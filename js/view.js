'use strict'
const $ = require('jquery')


let markerWindow = function(data){
	let lat = data.latitude;
	let lng = data.longitude;
	let title = data.brewery.name;
	let website = data.website;
	let organic = data.brewery.isOrganic;
	let address = data.streetAddress;
	let phone = data.phone;
	let index = i;
	let info = "<h1 class='popup'>" + title + "</h1><br><p class='pop-p'>Organic: " + organic + "<br><p class='pop-p'>" + address + "</p>" +
	        "<br><a class='pop-p' href='tel:" + phone + "'>phone:  " + phone + "</><br><a href='" + website + 
	        "' target='_blank'><p class='pop-p'>Check out our Webiste</p></a>";
	return info;
}


function renderHtmlList(title, website, index){

  let list = $('<div>').addClass('js-list');
  let description = $('<div>').addClass('description description-block');
  let listName = $('<h4>').addClass('list-name').attr('id', index).html(title);
  let link = $('<a>').attr('href', '#').addClass('wind marker-link')
  let addTo = $('<button>').addClass('add').html('Save To List');

  let web = $(link).append(listName).append(addTo);
  let descript = $(description).append(web);
  let listed = $(list).append(descript);

  // $('.list-container').fadeIn('slow');
  $('.places').after(listed);
}



function deleteMarkers(){
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  };
  markers = [];
}


function emptyList(){
  let say = $('<h4>').addClass('list-name sorry').append('Sorry! No breweries there... Try another place!')
  $('.places').after(say);
}



