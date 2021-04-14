getResultOpenWeatherMap = function(data, callback) {

	// Search the current weather with latitude and longitude and after that search forecasts for the next five hours.
	// Promises are created to wait the functions finish before start next functions.

	getCurrentWeather(data.lat, data.lng).then(value =>{

		getForecastResult(data.lat, data.lng).then(list =>{

			// Current weather is inserted to first index of arraylist
			list.unshift(value);

			data.list = list;

			// After all, call the function showTemperature
			callback(data);

		}).catch(err =>{

			Swal.fire({
			  title: 'Error!',
			  text: err,
			  icon: 'error',
			});

		});

	}).catch(err =>{

		Swal.fire({
		  title: 'Error!',
		  text: err,
		  icon: 'error',
		});


	});

}

getCurrentWeather = function(lat, lng) {

	//http://api.openweathermap.org/data/2.5/weather?lat=-27.8154928&lon=-50.3263991&hour=9&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c
	return new Promise(function(resolve, reject) {

		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c',
			dataType: 'JSON',
			complete: function(response){
				
				if(response){

					if(response.status == "200"){

						resolve(response.responseJSON);

					}else{

						reject("Location Not Found!");

					}

				}else{

					reject("Error conect to API!");

				}		
				
			}
		});

	});

}


getForecastResult = function(lat, lng) {

	//http://api.openweathermap.org/data/2.5/weather?lat=-27.8154928&lon=-50.3263991&hour=9&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c
	return new Promise(function(resolve, reject) {

		var result = {};

		$.ajax({

			url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c',
			dataType: 'JSON',
			complete: function(response){
				
				if(response.responseJSON){

					if(response.responseJSON.cod === "200"){

						var today = new Date(); 
						var list  = [];	
						var count = 0;

						for (var i = 0; i < response.responseJSON.list.length; i++) {
							
							var date = new Date(response.responseJSON.list[i].dt_txt);

							// It checks if the next date is greater than the current one (to as not repeat) and the amount less than 5
							if(date > today && count < 5){

								list.push(response.responseJSON.list[i]);
								count++;
							}
						}

						resolve(list);


					}else{

						reject("Location Not Found!");
					}

				}else{

					reject("Error conect to API!");

				}		
				
			}
		});

	});

}
