// //// 

var gifs =
{ 
  queue: 
  [
    {id: 0, name:"Bugs Bunny"},
    {id: 1, name:"Daffy Duck"},
    {id: 2, name:"Porky Pig"},
    {id: 3, name:"Marvin the Martian"},
    {id: 4, name:"Foghorn Leghorn"},
    {id: 5, name:"Wile E. Coyote"},
    {id: 6, name:"The Roadrunner"}
  ]
};

localStorage.setItem('gifs', JSON.stringify(gifs));

var itemCount = 0;
$("#newButton").on("click", function (event) {
    // BEST PRACTICE TO PREVENT FORM FROM SUBMITTING
    event.preventDefault();
    
    // GET THE INPUT VALUE FROM THE USER TO BE ADDED TO A BUTTON
    var addGifText = $('#nameField').val();
    
    createItem(itemCount, addGifText);
    itemCount++;
    
});

function createItem(itemNumber, addGifText) {
    var itemId = "item-" + itemNumber;
    
    var todoP = $('<p>').attr("id", itemId).text(addGifText);
    
    localStorage.setItem(itemId, addGifText);
    var itemBtn = $("<button>", {
        "gifAdded": itemNumber,
        class: "checkbox",
        text: 'X'
    });
    
    // APPEND THE BUTTON TO THE newButton ITEM
    todoP.prepend(itemBtn);
    $('#resultsButton').append(todoP);
    
    // THEN CLEAR THE TEXTBOX WHEN DONE
    $('#nameField').val("");
}

$(document.body).on("click", ".checkbox", function () {
    
    var itemId = $(this).attr("gifAdded");
    console.log(itemId);
    $('#item-' + itemId).empty();
    
});

$(document).ready(function () {
    
    makeGif();

    function makeGif() {
      var restoredGifs = JSON.parse(localStorage.getItem('gifs'));
      var outputs = "";
      for(var i = 0; i < restoredGifs.queue.length; i++)
      {
          outputs += `<div id="${restoredGifs.queue[i].id}">
          <input type="button" id="gifCallButton" class="nes-btn" 
          value="${restoredGifs.queue[i].name}"/></div>`;
      }
      document.getElementById("resultsButton").innerHTML= outputs;
    }
    function addGif() {
      var restoredGifs = JSON.parse(localStorage.getItem('gifs'));
      
      restoredGifs.queue.push({
        id:  Math.floor(Math.random() * (100 - 1 + 1)) + 1,
        name: $('input').val()
      });
      localStorage.setItem('gifs', JSON.stringify(restoredGifs));
      makeGif();
    }
    
});

//// 
//// 

CALL AND POPULATE GIF
function getGif() {

    // GET
    var magic;
    console.log(magic);
    magic = $('#nameField').val();
    //SET
    $('#nameField').val(magic);
    console.log(magic);
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=zGfrjOHn6S3dvmRKo9mb00sGQ729qbEd&tag=" + magic + "";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var imageUrl = response.data.image_original_url;
            var magicImage = $("<img>");
            magicImage.attr("src", imageUrl);
            magicImage.attr("alt", "magic image");
            $("#resultsImage").prepend(magicImage);
        });
};

// MAKE BUTTONS TO CALL GIF
function getGifButton() {

    // GET
    var magic;
    magic = $('#nameField').val();
    //SET
    $('#nameField').val(magic);
    console.log(magic);
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=zGfrjOHn6S3dvmRKo9mb00sGQ729qbEd&tag=" + magic + "";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var imageUrl = response.data.image_original_url;
            var magicImage = $("<img>");
            magicImage.attr("src", imageUrl);
            magicImage.attr("alt", "magic image");
            $("#resultsImage").prepend(magicImage);
        });
};