getResultGoogleApi = function(location) {

	//http://api.openweathermap.org/data/2.5/weather?lat=-27.8154928&lon=-50.3263991&hour=9&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c
	return new Promise(function(resolve, reject) {
	  
	  	var fullLocation = {};

		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyD6rKc6URJVJv5GNgNydJxd19jitau6pg0',
			dataType: 'JSON',
			complete: function(response){
				
				if(response.responseJSON.results){

					if(response.responseJSON.status == "OK"){

						var result = response.responseJSON.results;

						fullLocation.lng = result[0].geometry.location.lng;
						fullLocation.lat = result[0].geometry.location.lat;

						for (var i = 0; i < result[0].address_components.length; i++) {

							if(result[0].address_components[i].types[0] == "administrative_area_level_2"){		

								fullLocation.city = result[0].address_components[i].long_name;
								
							}

							if(result[0].address_components[i].types[0] == "administrative_area_level_1"){		

								fullLocation.state = result[0].address_components[i].long_name;
								
							}

						}

						resolve(fullLocation);

					}else{

						reject("Zero results! Check the reported location.");
					}

				}else{

					reject("Error conect to API!");

				}		
				
			}
		});
	});

}