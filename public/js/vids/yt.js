var myTimer;   

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function getTime() {
return player.getCurrentTime();
};


// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player("player", {
    "height": "315",
    "width": "560",
    "videoId": "bHQqvYy5KYo",
    "modestbranding": "1",
    "events": {
      "onReady": onPlayerReady,
      "onStateChange": onPlayerStateChange
    }
  });
}

$('#syncbutton').click( function(roomnum) {

  getTime();
});
//

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.playVideo();
      
    }
  function onPlayerStateChange(event){
      if(event.data==1) { // playing
          myTimer = setInterval(function(){ 
              var time;
              time = player.getCurrentTime();
              $("#timeHolder").text(time);
          }, 100);
      }
      else { // not playing
          clearInterval(myTimer);
      }
  }
  
