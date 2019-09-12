function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
       }); 
       function youtube_image($id) {
    $resolution = array (
        'maxresdefault',
        'sddefault',
        'mqdefault',
        'hqdefault',
        'default'
    );

    for ($x = 0; $x < sizeof($resolution); $x++) {
        $url = '//img.youtube.com/vi/' . $id . '/' . $resolution[$x] . '.jpg';
        if (get_headers($url)[0] == 'HTTP/1.0 200 OK') {
            break;
        }
    }
    return $url;
}
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("views/layouts/layout.handlebars", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
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
