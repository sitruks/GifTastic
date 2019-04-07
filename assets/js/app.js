var gifs =
{
    queue:
        [
            { id: 0, name: "Bugs Bunny" },
            { id: 1, name: "Daffy Duck" },
            { id: 2, name: "Porky Pig" },
            { id: 3, name: "Marvin the Martian" },
            { id: 4, name: "Foghorn Leghorn" },
            { id: 5, name: "Wile E Coyote" },
            { id: 6, name: "The Roadrunner" }
        ]
};
localStorage.setItem('gifs', JSON.stringify(gifs));
var itemCount = 0;

$("#newGifButton").on("click", function (event) {
    // PREVENT FORM FROM SUBMITTING
    event.preventDefault();
    var newGifTextInput = $('#newGifText').val();
    createItem(itemCount, newGifTextInput);
    itemCount++;
});


var restoredGifs = JSON.parse(localStorage.getItem('gifs'));
console.log(restoredGifs);
var outputs = "";
function createItem(itemNumber, newGifTextInput) {
    var gifButton;
    var itemId = "item-" + itemNumber;
    // var gifContent = $('<li class="list-group-item">').attr("id", itemId).text(newGifTextInput);
    var gifContent = $(`<li id="${itemId}" class="list-group-item"><input type="button" id="gifCallButton" class="nes-btn" 
    value="${newGifTextInput}"/></div></li>`);
    localStorage.setItem(itemId, newGifTextInput);
    var removeGif = $("<button>", {
        "gifToRemove": itemNumber,
        class: "checkbox",
        text: 'X'
    });

    // Append the button to the to do item
    gifButton = gifContent.prepend(removeGif);

    $('#resultsButton').append(gifButton);

    // Clear the textbox when done
    $('#newGifText').val("");
};

$(document.body).on("click", ".checkbox", function () {
    var itemId = $(this).attr("gifToRemove");
    console.log(itemId);
    $('#item-' + itemId).empty();
});

$(document).ready(function () {

    for (var i = 0; i < restoredGifs.queue.length; i++) {
        var gifName = restoredGifs.queue[i].name
        console.log(gifName)
        // var newGifTextInput = $(gifName).val();
        createItem(itemCount, gifName);
        itemCount++;
    }
});

// $('#gifCallButton').on('click', function (event) {
//     // BEST PRACTICE TO PREVENT FORM FROM SUBMITTING
//     event.preventDefault();
//     //// CALL AND POPULATE GIF
//     function getGif() {
//         // GET
//         var magic;
//         console.log(magic);
//         magic = $('#gifCallButton').val();
//         //SET
//         $('#gifCallButton').val(magic);
//         console.log(magic);
//         var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=zGfrjOHn6S3dvmRKo9mb00sGQ729qbEd&tag=" + magic + "";
//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         })
//             .then(function (response) {
//                 console.log(response);
//                 var imageUrl = response.data.image_original_url;
//                 var magicImage = $("<img>");
//                 magicImage.attr("src", imageUrl);
//                 magicImage.attr("alt", "magic image");
//                 $("#resultsImage").prepend(magicImage);
//             });
//     };
//     getGif();

// });