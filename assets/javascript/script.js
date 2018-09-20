$(document).ready(function () {
    var numberOfGifs = 10;
    var cutOffRating = "R";
    var datastate = $(this).attr("data-state");
    var topic = ["Pulp Fiction", "Reservoir Dogs", "The Office", "Mad Max", "Terminator", "Pineapple Express", "Step Brothers", "American Psycho", "Scarface", "Jaws", "The Godfather"];
    $("#movies").on("click", function () {
        var search = $("#searchGifs").val().trim();
        if (!search) return;
        reset();

        function reset() {
            $("#resetGifs").on("click", function () {
                location.reload();
            })
        }
        event.preventDefault();
        getGifs(search, true);
    });

    makeButtons();
    $('button').on("click", function () {
        console.log(this.id);
        var i = parseInt(this.id)
        console.log(topic[i]);
        getGifs(topic[i], false);
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
        };
        $("header").append(buttonHtml);
    };

    function getGifs(search, addButton) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UBRXS2Hn92b38ylqRMMlqDBskoLpYgzz&rating=g&limit=10&q=" + search;
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var movie = $("#searchGifs").val(),
                    imageHtml = "";
                for (var i = 0; i < response.data.length; i++) {
                    imageHtml = imageHtml + "<img id='" + response.meta.response_id +
                        "' src='" + response.data[i].images.original.webp + "'" +
                        " data-animated='off'" +
                        " data-still='" + response.data[i].images.original_still.url + "'" +
                        " data-animate='" + response.data[i].images.original.webp + "'>";
                }
                console.log(imageHtml);
                $("#mainContent").prepend(imageHtml);
                if (addButton)
                    $("header").append("<button onclick='myFunction()'>" + movie + "</button>");
            });
    }
});

function handleButtonClick() {
    console.log(this.id);
    var i = parseInt(this.id)
    console.log(topic[i]);
    getGifs(topic[i], false);
};