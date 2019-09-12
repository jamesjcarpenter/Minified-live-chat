var controller = null;

window.onload = function() {
var video = $_("video");
video.addEventListener("timeupdate", function() {
  if (iAmControlling()) conn.send(video.currentTime);
}, true);
video.addEventListener("pause", function() {
  if (iAmControlling()) conn.send("pause "+video.currentTime);
}, true);
conn.onmessage = function (ev) {
  var matches;
  if (matches = ev.data.match(/^control (.+)$/)) {
    $_("#controller").innerHTML = matches[1];
  } else if (matches = ev.data.match(/^userCount (.+)$/)) {
    // $_("#userCount").innerHTML = matches[1];
    document.getElementById("userCount").innerHTML = matches[1];
  } else if (matches = ev.data.match(/^pause (.+)$/)) {
    video.currentTime = matches[1];
    video.pause();
  } else {
    if (iAmControlling()) return;
    var estimatedTimeOnMaster = parseInt(ev.data)+1;
    if (Math.abs(estimatedTimeOnMaster-video.currentTime)>5)
      video.currentTime = estimatedTimeOnMaster;
    if (video.paused) video.play();
  }
};
$_("#takeControl").onclick = function(ev) {
  conn.send("control "+$_("#name").value);
};
$_("#leave").onclick = function() {
  conn.close();
  $_("#room").className = "inactive";
  $_("#registration").className = "active";
};
};
};
function iAmControlling() {
return $_("#controller").innerHTML == $_("#name").value;
}
function $_(sel) {
return document.querySelector(sel);
}
