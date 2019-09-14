function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$('#youtubeplayer').hide();

var tag = document.createElement('script');

   tag.src = "https://www.youtube.com/iframe_api";
   var firstScriptTag = document.getElementsByTagName('script')[0];
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

   // 3. This function creates an <iframe> (and YouTube player)
   //    after the API code downloads.
   var player;
   function onYouTubeIframeAPIReady() {
     player = new YT.Player('player', {
       height: '390',
       width: '640',
       videoId: videoId,
       events: {
         'onReady': onPlayerReady,
         'onStateChange': onPlayerStateChange
       }
     });
   }

   // 4. The API will call this function when the video player is ready.
   function onPlayerReady(event) {
     event.target.playVideo();
   }

   // 5. The API calls this function when the player's state changes.
   //    The function indicates that when playing a video (state=1),
   //    the player should play for six seconds and then stop.
   var done = false;
   function onPlayerStateChange(event) {
     if (event.data == YT.PlayerState.PLAYING && !done) {
       setTimeout(stopVideo, 6000);
       done = true;
     }
   }
   function stopVideo() {
     player.stopVideo();
   }


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
                    document.getElementById("#youtubeplayer").src="https://www.youtube.com/embed/<%= videoid %>&?autoplay=1?rel=0";
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
