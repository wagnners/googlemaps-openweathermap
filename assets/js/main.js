$(document).ready(function() {

	clicks();
	checkCookie();

});

function clicks(){

	$('#show-temperature').on('click', function(){

		btnShowTemperature($(this).closest("form"));

	});
}

function btnShowTemperature(form){

	if(validate(form)){
	
		//Promise to get location of input on GoogleMapsApi

		getResultGoogleApi($("#location").val()).then(result =>{
		
			getForecast(result);
			
		}).catch(err =>{

			Swal.fire({
			  title: 'Error!',
			  text: err,
			  icon: 'error',
			});

		});

	}
}


function getForecast(data){


	getResultOpenWeatherMap(data, showTemperature);

}

function showTemperature(data){

	// Show name and state found and assemble the table according to the results

	$('.card-header i').html(data.city + " - " + data.state);

	$('.table.table-borderless tr').remove();
	$('.table.table-borderless thead').append('<tr><th scope="col"></th><th scope="col font-weight-bold">Current</th></tr>');
	$('.table.table-borderless tbody').append('<tr class="forecast-icon"><th scope="col"></th></tr><tr><th scope="col">Min</th></tr><tr><th scope="col font-weight-bold">Max</th><tr>');
	
	for (var i = 0; i < data.list.length; i++) {

		if(i > 0){

			// It separates the date from the time to show in the table
			var date = data.list[i].dt_txt.split(" ");
			date = date[1];

			$('.table.table-borderless thead tr').append('<th scope="col font-weight-bold">' + date + '</th>');
		}

		$('.table.table-borderless tbody tr:nth-child(1)').append('<td scope="col class="forecast-icon"><img src="http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png" title="' + data.list[i].weather[0].description + '"></td>');
		$('.table.table-borderless tbody tr:nth-child(2)').append('<td scope="col">' +data.list[i].main.temp_min + 'º C</td>');
		$('.table.table-borderless tbody tr:nth-child(3)').append('<td scope="col">' +data.list[i].main.temp_max + 'º C</td>');


	}

	$('.forecast').show("2000");

	setCookie(data);


}

function setCookie(data){

	var now 	= new Date();
	var time 	= now.getTime();
	
	// 6 hours x 60 seconds = 360 seconds;  60 x 1000 = 60.000 milliseconds; 60.000 x 360 = 21.600.000 = 6 hours
	time +=  360 * 60 * 1000;
	now.setTime(time);
	
	document.cookie = 
	'location=' + [ data.city, data.state, data.lat, data.lng] + 
	';expires=' + now.toUTCString() + 
	';path=/';

}

function checkCookie(){

  	var decodedCookie 	= decodeURIComponent(document.cookie);
  	var result 			= decodedCookie.split(';');

  	for(var i = 0; i <result.length; i++) {

     	var stg = result[i];

    	while (stg.charAt(0) == ' ') {

      		stg = stg.substring(1);
    	
    	}

    	if (stg.indexOf("location=") == 0) {
      		
      		var location = stg.substring("location=".length, stg.length);

      		location = location.split(",");

      		var data = {};

      		data.city 	= location[0];
      		data.state 	= location[1];
      		data.lat 	= location[2];
      		data.lng 	= location[3];

      		getResultOpenWeatherMap(data, showTemperature);

    	}
  	}

}


