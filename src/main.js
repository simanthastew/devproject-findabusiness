// CSS
require('./main.scss')
const $ = require('jquery')

$( document ).ready(function() {

  $('#search').on('click', function(e) {
    e.preventDefault();
    loadMap();
  })

});

function validateSearch(business, zipcode) {
	if(business.length == 0) {
		return false;
	} else if(zipcode.length == 0) {
		return false;
	} else {
		return true;
	}
}

function loadMap() {
	const business = $('#searchedBiz').val();
	const zip = $('#zipcode').val();
  const searchParams = business + ' ' + zip;

	if(validateSearch(business, zip)) {

    const mapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
		const service = new google.maps.places.PlacesService(map);

    service.textSearch({
        query: searchParams
    }, function(results) {
        map.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));

        for (var i = 0; i < results.length; i++) {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng()),
                map: map,
                optimized: false,
                });

            const infowindow = new google.maps.InfoWindow({
  						content: results[i].name + ' ' + results[i].formatted_address,
						});

						marker.addListener('click', function() {
							infowindow.open(map, marker);
						});


        	}
       	}
    	)
		}
	}
		

