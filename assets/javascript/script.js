var btnId= 1000;
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
    $('.fixedbtn').on("click", function () {
        var i = parseInt(this.id)
        console.log(topic[i]);
        getGifs(topic[i], false);
    });
    $('body').on('click', 'img', handleImageClick);

    function handleImageClick() {
        var id = "#" + this.id;
        var imgDatastate = $(id).data("animated");
        var animatedImage = $(id).data("animate");
        if (this.src !== animatedImage) {
            this.src = animatedImage;
        } else {
            var stillImage = $(id).data("still");
            this.src = stillImage;
        }
    }

    function makeButtons() {
        $("#mainContent").empty();
        var buttonHtml = "";
        for (i = 0; i < topic.length; i++) {
            buttonHtml = buttonHtml + "<button id='" + i + "' class='fixedbtn'>" + topic[i] + "</button>";
        };
        $("header").append(buttonHtml);
    };
    localStorage.setItem(getGifs)
});
    function getGifs(search, addButton) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UBRXS2Hn92b38ylqRMMlqDBskoLpYgzz&rating=r&limit=10&q=" + search;
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var movie = $("#searchGifs").val(),
                    imageHtml = "";
                for (var i = 0; i < response.data.length; i++) {
                    imageHtml = imageHtml + "<img id='" + response.data[i].id +
                        "' src='" + response.data[i].images.original.webp + "'" +
                        " data-still='" + response.data[i].images.original_still.url + "'" +
                        " data-animate='" + response.data[i].images.original.webp + "'>";
                }
                $("#mainContent").prepend(imageHtml);
                if (addButton) {
                    $("header").append("<button class='dyna' id='" + btnId++ + "' monclick='handleButtonClick()'>" + movie + "</button>");
                    $('.dyna').on("click", function () {
                        var i = parseInt(this.id)
                        console.log("dynamic button clicked");
                        getGifs(this.textContent, false);
                    });
                }
            });
    }

function handleButtonClick(e) {
    var i = parseInt(this.id)
    getGifs(topic[i], false);
};