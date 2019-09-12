init();


$("form").on("submit", function(e) {
  e.preventDefault();
  var request = gapi.client.youtube.search.list({
    part: "snippet",
    type: "video",
    q: encodeURIComponent($("#search").val()).replace(/%/g, "+"),
    maxResults: 5,
    order: "viewCount",
  });
  //executre
  request.execute(function(response) {
    var results = response.result;
    $("#results").html("");
    $.each(results.item, function(index, item) {
      $.get("layout.handlebars", function(data) {
        $("#results").append(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]);
      });
    });
    resetVideoHeight();
  });
});

$(window).on("resize", resetVideoHeight);

function resetVideoHeight() {
  $(".video").css("height", $("#results").width() * 9/16);
}
// var socket = io.connect('anomic.io/443');
function init() {
  gapi.client.setApiKey("AIzaSyCuKhQw-AouTjuiEIKquFiJuiWgpffr-LM");
  gapi.client.load("youtube", "v3", function() {
    //yt api is ready
  });
}
