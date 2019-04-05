// //// 

var characters = ["Bugs Bunny", "Daffy Duck", "Porky Pig", 
              "Marvin the Martian", "Foghorn Leghorn", "Wile E. Coyote", "The Roadrunner"];
 
localStorage.setItem("looneyTunes", JSON.stringify(characters));

var retrievedData = localStorage.getItem("looneyTunes");
var allCharacters = JSON.parse(retrievedData);





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
    
    // $("#newButton").on("click", getGif);
    
    for (var i = 0; i < localStorage.length; i++) {
        var itemKey = localStorage.key(i);
        var item = localStorage.getItem(itemKey);
        console.log(itemKey, item);
        
        var numberId = itemKey.slice(5, itemKey.length);
        console.log(numberId);
        createItem(numberId,item );
    }
    
});

// //// 
// //// 

// CALL AND POPULATE GIF
// function getGif() {

//     // GET
//     var magic;
//     console.log(magic);
//     magic = $('#nameField').val();
//     //SET
//     $('#nameField').val(magic);
//     console.log(magic);
//     var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=zGfrjOHn6S3dvmRKo9mb00sGQ729qbEd&tag=" + magic + "";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         .then(function (response) {
//             console.log(response);
//             var imageUrl = response.data.image_original_url;
//             var magicImage = $("<img>");
//             magicImage.attr("src", imageUrl);
//             magicImage.attr("alt", "magic image");
//             $("#resultsImage").prepend(magicImage);
//         });
// };

// // MAKE BUTTONS TO CALL GIF
// function getGifButton() {

//     // GET
//     var magic;
//     magic = $('#nameField').val();
//     //SET
//     $('#nameField').val(magic);
//     console.log(magic);
//     var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=zGfrjOHn6S3dvmRKo9mb00sGQ729qbEd&tag=" + magic + "";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         .then(function (response) {
//             console.log(response);
//             var imageUrl = response.data.image_original_url;
//             var magicImage = $("<img>");
//             magicImage.attr("src", imageUrl);
//             magicImage.attr("alt", "magic image");
//             $("#resultsImage").prepend(magicImage);
//         });
// };