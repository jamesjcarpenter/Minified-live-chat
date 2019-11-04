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
                    
                    $('.ui.longer.modal')
                    .modal('hide');
                    
                    $("#youtubeplayer")[0].src += "&autoplay=1";
                    $('#youtubeplayer').appendTo('#vidWtch');
                    document.getElementById("#youtubeplayer").src="https://www.youtube.com/embed/<%= videoid %>?theme=light&amp;autohide=2&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;disablekb=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fanomic.io&amp;iv_load_policy=3&amp;autoplay=1&amp;loop=0&amp;fs=0&amp;playsinline=1&amp;modestbranding=1&amp;playerapiid=ytplayer&amp;widgetid=1";
                    
                     });
                });
            });
          });
          // resetVideoHeight();
       });
    });

    // $(window).on("resize", resetVideoHeight);
});


// function resetVideoHeight() {
//     $(".video").css("height", $("#results").width() * 9/16);
// }

function init() {
    gapi.client.setApiKey("AIzaSyCuKhQw-AouTjuiEIKquFiJuiWgpffr-LM");
    gapi.client.load("youtube", "v3", function() {
    });
  }
