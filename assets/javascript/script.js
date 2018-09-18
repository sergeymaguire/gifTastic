$(document).ready(function () {
    var numberOfGifs = 10;
    var cutOffRating = "R";
    var datastate = $(this).attr("data-state");
    var topic = ["Star Wars", "Pulp Fiction", "Reservoir Dogs", "The Evil Dead", "Mad Max", "Terminator", "Pineapple Express", "Step Brothers", "The Conjuring", "American Psycho", "Scarface", "Jaws", "The Godfather", "Saving Private Ryan", "Gladiator", "Hannibal", "The Crazies", "Bourne Ultimatum", "Superbad", "Billy Madison", "Lord of the Rings", "50 First Dates", "Benchwarmers"];
    $("#movies").on("click", function () {
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + $("#searchGifs").val().trim();
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
                    imageHtml = "";
                    //<img src="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
                imageHtml = imageHtml + "<img id='" + response.meta.response_id 
                          + "' src='" + response.data.image_original_url + "'"
                          + "' data-animated='off'" 
                          + "' data-still='" + response.data.images["downsized_still"].url + "'"
                          + "' data-animate='" + response.data.image_original_url + "'"
                          + ">" + "</img>";
                console.log(imageHtml);
                $("#mainContent").prepend(imageHtml);
                $("header").append("<button>" + movie + "</button>");
            });
    });

    makeButtons();
    $('button').on("click", function () {
        console.log(this.id);
        var i = parseInt(this.id)
        console.log(topic[i]);
    });
    $('body').on('click', 'img', handleImageClick);

    function handleImageClick() {
        console.log("clicked")
        var id = "#" + this.id;
        var imgDatastate = $(id).data("animated");
        if (imgDatastate === "off") {
            var animatedImage = $(id).data("animate");
            console.log("animatedImage " + animatedImage);
            this.src = animatedImage;
            //$(id).attr("src", $(id).attr("data-animate"));
            $(id).data("animated", "on");
        } else {
            var stillImage = $(id).data("still");
            this.src = stillImage;
            console.log("stillImage " + stillImage);
            $(id).data("animated", "off");
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