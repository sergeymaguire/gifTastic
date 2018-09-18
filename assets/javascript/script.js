$(document).ready(function () {
    var numberOfGifs = 10;
    var cutOffRating = "R";
    var datastate = $(this).attr("data-state");
    var topic = ["Star Wars", "Pulp Fiction", "Reservoir Dogs", "The Evil Dead", "Mad Max", "Terminator", "Pineapple Express", "Step Brothers", "The Conjuring", "American Psycho", "Scarface", "Jaws", "The Godfather", "Saving Private Ryan", "Gladiator", "Hannibal", "The Crazies", "Bourne Ultimatum", "Superbad", "Billy Madison", "Lord of the Rings", "50 First Dates", "Benchwarmers"];
    $("#movies").on("click", function () {
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=s" + $("#searchGifs").val().trim();
        reset();

        function reset() {
            $("#resetGifs").on("click", function () {
                location.reload();
            })
        }

        event.preventDefault();
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var movie = $("#searchGifs").val(),
                    imageUrl = response.data.image_original_url,
                    movies = $("<img>");

                movies.attr("src", imageUrl);
                movies.attr("alt", "movies");

                $("#mainContent").prepend(movies);
                $("header").append("<button>" + movie + "</button>");
            });
    });

    makeButtons();
    $('button').on("click", function () {
        console.log(this.id);
        var i = parseInt(this.id)
        console.log(topic[i]);
    });
    $('body').on('click','img',handleImageClick);
    
    function handleImageClick() {
        console.log("clicked")

        if (datastate === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    }


    function makeButtons() {
        $("#mainContent").empty();
        var buttonHtml = "";
        for (i = 0; i < topic.length; i++) {
            buttonHtml = buttonHtml + "<button id='" + i + "' character-btn>" + topic[i] + "</button>";
            //$("header").append("<button>" + movie[i] + "</button>");
        };
        $("header").append(buttonHtml);

    };



});