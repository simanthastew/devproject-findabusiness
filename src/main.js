// CSS
require('./main.scss')
const $ = require('jquery')
const Clarifai = require('clarifai');


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
		$('#error').text('');
		$('#searchForm :input').val('');;
    const mapOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
		const service = new google.maps.places.PlacesService(map);

    service.textSearch({
        query: searchParams
    }, function(results) {
        map.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));

        const marker = new google.maps.Marker({
        	position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
        	map: map
        })

        service.getDetails({
      		placeId: results[0].place_id
    		}, function(results) {
      		appendInfo(results)
    		});

    });
	} else {
		$('#error').text('Please enter a valid zipcode and business name.')
	}
}

function appendInfo(business) {
	$('#name').text(business.name);
	$('#phone').text(business.formatted_phone_number);
	$('#address').text(business.formatted_address);
	$('#website').text(business.name);
	$('#type').text(business.types[0]);

	if(business.photos.length > 0) {
		for(var i = 0; i < 5; i++) {
			const photo = business.photos[i].getUrl({'maxWidth': 100, 'maxHeight': 100});
			const img = $('<img>');
			img.attr('src', photo);
			img.appendTo($('#photoSet'));
			tagImage(photo);
		}
	}
}

function tagImage(url) {
	const app = new Clarifai.App(
		'NO18sIhXk9nZDkAdVXNPSThzPXPI8wHn78vAncxe',
		'c2vHENnTnNj6XdFkXCEWbG1g1oSdBmTqOTO44eP9'
	);

	app.models.predict(Clarifai.GENERAL_MODEL, url).then(
	  function(response) {
	  	const tags = [];
	  	for(var i=0; i < 3; i++) {
	  		const tag = response.outputs[0].data.concepts[i].name;
	  		$('#photoSet').append(tag)
	  	}
	  }, function(err) {
	    console.error(err);
	  }
	)
}
		

