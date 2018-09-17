$(document).ready(function () {
    $("#movies").on("click", function () {
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=movies";
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
                var movie = $("#searchGifs").val();
                

                var imageUrl = response.data.image_original_url;

                var movies = $("<img>");

                movies.attr("src", imageUrl);
                movies.attr("alt", "cat image");

                $("#mainContent").prepend(movies);
                $("header").append("<button>Names...</button>");
            });
    });

});