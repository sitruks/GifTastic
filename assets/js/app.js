// //// 

// VARIABLE FOR GAME LEVEL SELECT FOR DISPLAY AT START
// var gameWelcome = $("div#gameWelcome");
// var gameLevelSelect = $("div#gameLevelSelect");
// var gameQuestionBox = $("div#gameQuestionBox").hide();
// var gameResults = $("div#gameResults").hide();
// var gameProgress = $("div#gameProgress").hide();


// RANDOM IMAGE WITH USER INPUT FOR END OF GAME

// function userName() {
//     $("#name_field").empty();
//     //GET
//     magic = $('#name_field').val();
//     //SET
//     console.log(magic);
//     if (magic === null) {
//         magic = "Bats"
//     } else
//     $('#name_field').val(magic);
//     console.log(magic);
//     // clear the text field
//     // .css if it exists already
//     // display none with css
//     // add alert saying "welcome +name"
//     var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + magic + "";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         .then(function (response) {
//             var imageUrl = response.data.image_original_url;
//             var magicImage = $("<img>");
//             magicImage.attr("src", imageUrl);
//             magicImage.attr("alt", "magic image");
//             $("#resultsImage").prepend(magicImage);
//         });
// };

// // CALL AND POPULATE QUIZ
// $(document).ready(function () {

//     $("#startButton").on("click", start);

//     function start() {
//         $("#startButton").addClass("is-error is-disabled");
//         $("#startButton").html("Good Luck!");
//         gameWelcome.hide();

//     };

// });





// //// 
// //// 
// //// 

// CALL AND POPULATE QUIZ
$(document).ready(function () {

    $("#newButton").on("click", getGIF);

    function getGIF() {

        // GET
        magic = $('#name_field').val();
        //SET
        console.log(magic);
        if (magic === null) {
            magic = "Spongebob"
        } else
        $('#name_field').val(magic);
        console.log(magic);
        // clear the text field
        // .css if it exists already
        // display none with css
        // add alert saying "welcome +name"
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + magic + "";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var imageUrl = response.data.image_original_url;
                var magicImage = $("<img>");
                magicImage.attr("src", imageUrl);
                magicImage.attr("alt", "magic image");
                $("#resultsImage").prepend(magicImage);
            });
    };

});
