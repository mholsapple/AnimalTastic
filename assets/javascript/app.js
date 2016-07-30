// $(document).ready(function()
// {
var topics = ["Dog", "Cat", "Mouse", "Rabbit", "Bird", "Lion", "Tiger", "Bear", "Goose", "Hamster", "Pig", "Snake", "Giraffe", "Parrot", "Bearded Dragon"];

	function renderButtons()
	{

	$('#buttonsView').empty();

		for (var i = 0; i < topics.length; i++) 
		{
	         // Then dynamicaly generates buttons for each animal in the array
	         // Note the jQUery syntax here... 
	         var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
	         a.addClass('animal'); // Added a class 
	         a.attr('data-name', topics[i]); // Added a data-attribute
	         a.text(topics[i].toUpperCase()); // Provided the initial button text
	         $('#buttonsView').append(a); // Added the button to the HTML
	 	}
 	}

 	//Code for an on click function to take the input from #animal-input and create a button and add to #buttonsView

 	$('#addAnimal').on('click', function()
    {

		// This line of code will grab the input from the textbox
		var animal = $('#animal-input').val().trim();

		// The animal from the textbox is then added to our array
		topics.push(animal);
		console.log(topics)

		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on hit button and it won't move to the next page
		return false;
	});


 	//Code for an on click function for all button tags that takes the data from the button and uses that as the search term in the API call
 	// 
 	function displayAnimalImage()
 	{

 		$('#gifsAppearHere').empty();
        var animal = $(this).data('name');
        console.log(animal);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        $.ajax(
        {
                url: queryURL,
                method: 'GET'
        })
            .done(function(response) 
            {

                console.log(response)
            
                var results = response.data
                //--------------------------------

                for (var i = 0; i < results.length; i++) 
                {

                    var animalDiv = $('<div>');
                    var p = $('<p>');
                    p.text("Rating: " + (results[i].rating).toUpperCase());

                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.original_still.url);
                    animalImage.attr('data-still', results[i].images.original_still.url);
                    animalImage.attr('data-animate', results[i].images.original.url);
                    animalImage.attr('data-state', 'still');
                    animalImage.attr('width', '400px');
            
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $("#gifsAppearHere").prepend(animalDiv);

                }
            })
        
 	};	
 		//This should be where the images are created
 		$(document).on('click', '.animal', displayAnimalImage);

 		renderButtons();
 	//Code for an on click function for all img tags which is basically the state function animate/still copied and pasted
	$('body').on('click', 'img', function(){

	    var state =$(this).attr('data-state');

	    if ( state == 'still')
	    {
	        $(this).attr('src', $(this).data('animate'));
	        $(this).attr('data-state', 'animate');
	    }else
	    {
	        $(this).attr('src', $(this).data('still'));
	        $(this).attr('data-state', 'still');
	}   

}); 



// });