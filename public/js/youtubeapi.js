function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$('#youtubeplayer').hide();
$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 10,
            order: "viewCount",
       }); 
       
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("views/layouts/layout.handlebars", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                console.log(item.id.videoId)
                
                $.get("views/index.ejs", function(data) {
                  $('#youtubevideo').click( function() {
                    $('#youtubeplayer').appendTo('#vidWtch');
                    document.getElementById("#youtubeplayer").src="https://www.youtube.com/embed/<%= videoid %>?autoplay=1";
                    $('#youtubeplayer').show();
                     });
                });
            });
          });
          resetVideoHeight();
       });
    });

    $(window).on("resize", resetVideoHeight);
});


function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyCuKhQw-AouTjuiEIKquFiJuiWgpffr-LM");
    gapi.client.load("youtube", "v3", function() {
    });
  }
