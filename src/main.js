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
	if(validateSearch($('#searchedBiz').val(), $('#zipcode').val())) {

    const searchParams = $('#searchedBiz').val() + ' ' + $('#zipcode').val();
    
    const mapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const service = new google.maps.places.PlacesService(map);

    service.textSearch({
        query: searchParams
    }, function(results) {
    		console.log(results)
        const lat = results[0].geometry.location.lat();
        const long = results[0].geometry.location.lng();
        const center = new google.maps.LatLng(lat, long);
        map.setCenter(center);


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
		

