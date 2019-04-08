// ////
// GLOBAL VARIABLES
var gifs =
{
    queue:
        [
            { id: 0, name: "Bugs Bunny" },
            { id: 1, name: "Daffy Duck" },
            { id: 2, name: "Porky Pig" },
            { id: 3, name: "Marvin the Martian" },
            { id: 4, name: "Foghorn Leghorn" },
            { id: 5, name: "Wile E Coyote" }
        ]
};
localStorage.setItem('gifs', JSON.stringify(gifs));
var itemCount = 0;
var displayed = [];
var restoredGifs = JSON.parse(localStorage.getItem('gifs'));
console.log(restoredGifs);
var outputs = "";




// CREATE A NEW BUTTON WITH USER INPUT
$("#newGifButton").on("click", function (event) {
    // PREVENT FORM FROM SUBMITTING
    event.preventDefault();
    var newGifTextInput = $('#newGifText').val();
    createItem(itemCount, newGifTextInput);
    itemCount++;
});

// ADD IN PLAY/PAUSE FUCNTIONALITY TO CALLED GIFS
$(document.body).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    // LOGIC TO ESTABLISH GIF ANIMATION UPON CLICK FROM BASE STATE OF STILL
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate')
      } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still')
      }
});

// REMOVE BUTTON FROM VIEW, PERSISTS IN TEMP DATABASE
$(document.body).on("click", ".checkbox", function () {
    var itemId = $(this).attr("gifToRemove");
    console.log(itemId);
    $('#item-' + itemId).empty();
});

// CLEAR GIFS FROM VIEW,
$(document.body).on("click", "#clearGifButton", function () {
    $(".resultsImage").empty();
});

// TEMPLATE FUNCTION TO CREATE BUTTON FOR DISPLAY/CALLING GIFS
function createItem(itemNumber, newGifTextInput) {
    var gifButton;
    var itemId = "item-" + itemNumber;
    var gifContent = $(`<li id="${itemId}" class="list-group-item"><input type="button" class="gifCallButton nes-btn" 
    value="${newGifTextInput}"/></div></li>`);
    localStorage.setItem(itemId, newGifTextInput);
    var removeGif = $("<button>", {
        "gifToRemove": itemNumber,
        class: "checkbox",
        text: 'X'
    });
    // PREPEND THE removeGif BUTTON TO THE GIF VALUE
    gifButton = gifContent.prepend(removeGif);
    $('#resultsButton').append(gifButton);
    // CLEAR THE TEXTBOX WHEN DONE
    $('#newGifText').val("");
};

// TEMPLATE FUNCTION TO CREATE CARD TO DISPLAY GIFS
function buildCard(obj) {
    // CREATE TITLE DIV
    var divTitle = $("<div>");
    divTitle.text(obj.title.toUpperCase());
    // CREATE THE RATING DIV
    var divRating = $("<div>");
    divRating.text("Rating: " + obj.rating.toUpperCase());
    // CREATE THE IMAGE TAG
    var elem = $(`<img>`);
    elem.attr("src", obj.still);
    elem.attr("data-still", obj.still);
    elem.attr("data-animate", obj.animated);
    elem.attr("data-state", "still");
    elem.attr("class", "gif");
    // CREATE THE CARD
    var divCardHolder = $(`<div class="nes-container is-rounded">`);
    divCardHolder.attr("data-id", obj.id)
    divTitle.appendTo(divCardHolder);
    elem.appendTo(divCardHolder);
    divRating.appendTo(divCardHolder);
    return divCardHolder;
};

// 10 GIF, CUSTOM CALL BUTTON
$(document.body).on("click", ".gifCallButton", function () {
    var magic;
    //// CALL AND POPULATE GIF
    magic = $(this).val();
    console.log(magic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + magic + "&limit=10&rating=pg&offset=&api_key=zGfrjOHn6S3dvmRKo9mb00sGQ729qbEd";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            for (var i = 0; i < 10; i++) {
                // ESTABLISH VARIABLE FOR RETURNED OBJECT
                var obj = response.data[i];
                // CREATE A CARD FOR GIF OUTPUT WITH ALL PERTINENT STATS
                var cardObj = {
                    id: obj.id,
                    title: obj.title,
                    rating: obj.rating,
                    still: obj.images.fixed_height_small_still.url,
                    animated: obj.images.fixed_height_small.url,
                }
                // ADD THE OBJECT TO THE ARRAY [displayed]
                displayed.push(cardObj);
                // BUILD THE CARD
                var card = buildCard(cardObj);
                $(".resultsImage").prepend(card);
            }
        });

});

// BUTTONS TO LOAD BASED ON VARIABLES IN LOCAL STORAGE
$(document).ready(function () {

    for (var i = 0; i < restoredGifs.queue.length; i++) {
        var gifName = restoredGifs.queue[i].name;
        console.log(gifName);
        createItem(itemCount, gifName);
        itemCount++;
    };
});