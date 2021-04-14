$(document).ready(function() {

	focusInput();

});

function focusInput(){

	$("input").on('focus', function(e) {

		$('small').remove();

		$(e.target).after("<small>" + $(e.target).attr('placeholder-text') + "</small>");
		
  	});

  	$("body").on('click', function(e) {

		if(e.target.nodeName !== "INPUT"){

			$('small').remove();

		}
  	});

}

function validate(form){

	var validate = true;

	form.find('input').each(function(index, element){
	
		messageValidation($(this));

		if(!$(this).val()){

			validate = false;

		}
	});

	return validate;

}

function messageValidation(input){

	if(!input.val()){

		input.addClass('is-invalid');

	}else{

		input.removeClass('is-invalid');

	}

}