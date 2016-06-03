var buttonArray = ["rabbit","goat","bear"];

$(document).ready(function() {
  //initlize the canned buttons
  addButton();
  $('#addAnimal').on('click', function(event){
    //use preventDefault to keep the 'form' from refershing the html and clearing the new buttons
    event.preventDefault();
    var newAnimal = $('#animalInput').val().trim();
     $('#animalInput').val("")
    buttonArray.push(newAnimal);
    console.log("newAnimal = "+newAnimal);
    addButton();
  });

  $('#animalButton').on('click', '.animal', function(){
    var theButtonText = this.textContent;
    console.log("theButtonText = "+theButtonText);
    //replace space with +
    var searchText = theButtonText.replace(" ", "+");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchText+"&limit=10&api_key=dc6zaTOxFJmzC";
    //make the ajax call
    $.ajax({url: queryURL, method: 'GET'}).done(function(ajaxResponse) {
      addGifs(ajaxResponse);
    });//end ajax{GET}
  })//end #animalButton').on('click

  $("#giphysGoHere").on('click', '.giphy', function(e){
    //var gifClicked = e.target;
    animateGifs(e.target);
  })// end #giphysGoHere").on('click


  function addButton(){
    $('.animal').remove();
    for (var i = 0; i < buttonArray.length; i++) {
      var $button = $('<button>') // create <button></button> tag.
      $button.addClass('animal btn'); // Added a class
      $button.attr('data-name', buttonArray[i]); // Added a data-attribute
      $button.html(buttonArray[i]); // Provided the initial button text
      $('#animalButton').append($button); // Added the button to the HTML
    };
  }; //end addButton()
  function addGifs(ajaxResponse){
    for (var objNdx = 0; objNdx < ajaxResponse.data.length; objNdx++) {
      var gifUrlAnime = ajaxResponse.data[objNdx].images.fixed_height.url;
      var gifUrlStill = ajaxResponse.data[objNdx].images.fixed_height_still.url;
      var gifHeight = ajaxResponse.data[objNdx].images.fixed_height.height;
      var gifRating = ajaxResponse.data[objNdx].rating;
      var $div=$('<div>');
      $div.addClass("gifDiv pull-left");
      var $p=$('<p>').text("Rating: "+gifRating);
      $p.addClass("text-center");
      var $gifImage = $('<img>');
      $gifImage.attr('src', gifUrlStill);
      $gifImage.attr('data-still', gifUrlStill);
      $gifImage.attr('data-animate', gifUrlAnime);
      $gifImage.attr('data-state', 'still');
      $gifImage.addClass('giphy');
      $div.append($p);
      $div.append($gifImage);
      $('#giphysGoHere').prepend($div);
    }
  }

  function animateGifs(gifClicked){
            if ( $(gifClicked).attr('data-state') == 'still'){
                $(gifClicked).attr('src', $(gifClicked).data('animate'));
                $(gifClicked).attr('data-state', 'animate');
            }else{
                $(gifClicked).attr('src', $(gifClicked).data('still'));
                $(gifClicked).attr('data-state', 'still');
            }
  }
}); //end document).ready