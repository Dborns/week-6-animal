$(document).ready(function() {

	var animalArray = ['cat', 'dog', 'turtle', 'cow', 'horse', 'chicken',
						 'goat', 'wolf', 'bear', 'lion', 'tiger'];

	for(i=0; i<animalArray.length; i++) {
		var button = $('<button class="btn btn-primary">');
		button.text(animalArray[i]);
		$('#animalButtons').append(button);
	};

	$('#addAnimal').on('click', function() {

		var userIn = $('#animal-input').val().trim();
		if(userIn === '') {
			alert("Please enter an animal.");
		} else {
			var userButton = $('<button class="btn btn-primary">');
			userButton.text(userIn);
			$('#animalButtons').append(userButton);
			$('#animal-input').val('');
		}
		return false;
	});	

	$('#animalButtons').on('click', function(event) {
		$('#animals').empty();
		var animalName = $(event.target).text();
		console.log(animalName);
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&rating&api_key=dc6zaTOxFJmzC";
		$.ajax({url: queryURL, method: 'GET'})
            .done(function(response) {

            	for(i=0; i<10; i++) {
	                var imageUrl = response.data[i].images.fixed_height_still.url;
	                var animatedUrl = response.data[i].images.fixed_height.url;
	                var rating = $('<h3>Rating: ' + response.data[i].rating + '</h3>');
	                var image = $("<img>");
	                var div = $("<div>");
	                div.attr('class', 'animalDivs');
	                image.attr('src', imageUrl);
	                image.attr('alt', 'animal image');
	                image.attr('data-state', 'still');
	                image.attr('data-still', imageUrl);
	                image.attr('data-animate', animatedUrl);
	                $('#animals').append(div);
	                $(div).append(rating);
	                $(div).append(image);
            	};
            });
	});

	$('#animals').on('click', function(event) {
		var state = $(event.target).attr('data-state');
		console.log(state);
		console.log(event.target);

		if(state == 'still') {
            $(event.target).attr('src', $(event.target).attr('data-animate'));
            $(event.target).attr('data-state', 'animate');
        } else {
            $(event.target).attr('src', $(event.target).attr('data-still'));
            $(event.target).attr('data-state', 'still');
        }
	});

}); 