// These functions just simply play or pause the player
// Created for event listeners

//-----------------------------------------------------------------------------

function playOther(room) {
    socket.emit('play other', {
        room: socket.room
    });
}

function syncVideo(room) {
    var currTime = 0
    var state
    var videoId = id

    // var syncText = document.getElementById("syncbutton")
    // console.log(syncText.innerHTML)
    // syncText.innerHTML = "<i class=\"fas fa-sync fa-spin\"></i> Sync"

    switch (currPlayer) {
        case 0:
            currTime = player.getCurrentTime();
            state = playerStatus
            console.log("I am host and my current time is " + currTime + state)

    // Required due to vimeo asyncronous functionality
    if (currPlayer != 2) {
        socket.emit('sync video', {
            room: socket.room,
            time: currTime,
            state: state,
            videoId: videoId
        });
    }
}


function prevVideo(room) {
    // This gets the previous video
    socket.emit('change previous video', {
        room: socket.room
    }, function(data) {
        // Actually change the video!
        var prevTime = data.time
        var time = getTime()
        socket.emit('change video', {
            room: roomnum,
            videoId: data.videoId,
            time: time,
            prev: true
        }, function(data) {
            // Set to the previous time
            setTimeout(function() {
                seekTo(prevTime)
            }, 1200);
        });
    });
}

socket.on('justPlay', function(data) {
    console.log("currPlayer")
    switch (currPlayer) {
        case 0:
            if (playerStatus == -1 || playerStatus == 2) {
                player.playVideo()
            }
            break;
        case 1:
            if (dailyPlayer.paused) {
                dailyPlayer.play();
            }
            break;
        case 2:
            vimeoPlayer.getPaused().then(function(paused) {
                // paused = whether or not the player is paused
                if (paused) {
                    vimeoPlayer.play();
                } else {
                    console.log("already playing")
                }

            }).catch(function(error) {
                // an error occurred
                console.log("Error: Could not retrieve Vimeo Player state")
            });
            break;
        case 3:
            if (media.paused) {
                media.play();
            }
            break;
    }
});

function pauseOther(room) {
    socket.emit('pause other', {
        room: socket.room
    });
    //socket.broadcast.to("room-"+roomnum).emit('justPlay');
}

socket.on('justPause', function(data) {
    console.log("hiIamPausing!")
    switch (currPlayer) {
        case 0:
            player.pauseVideo()
            break;
        case 1:
            dailyPlayer.pause()
            break;
        case 2:
            vimeoPlayer.getPaused().then(function(paused) {
                // paused = whether or not the player is paused
                if (paused) {
                    console.log("already paused")
                } else {
                    vimeoPlayer.pause();
                }

            }).catch(function(error) {
                // an error occurred
                console.log("Error: Could not retrieve Vimeo Player state")
            });
            break;
        case 3:
            media.pause()
            break;
    }
    player.pauseVideo()
});

function seekOther(room, currTime) {
    socket.emit('seek other', {
        room: socket.room,
        time: currTime
    });
    // socket.emit('getData');
}


// Weird for YouTube because there is no built in seek event
// It seeks on an buffer event
// Only syncs if off by over .2 seconds
socket.on('justSeek', function(data) {
    console.log("Seeking Event!")
    currTime = data.time
    switch (currPlayer) {
        case 0:
            var clientTime = player.getCurrentTime();
            if (clientTime < currTime - .2 || clientTime > currTime + .2) {
                player.seekTo(currTime);
                // Forces video to play right after seek
                player.playVideo()
            }
            break;
        case 1:
            var clientTime = dailyPlayer.currentTime;
            if (clientTime < currTime - .2 || clientTime > currTime + .2) {
                dailyPlayer.seek(currTime);
            }
            playOther(roomnum)
            break;
        case 2:
            vimeoPlayer.getCurrentTime().then(function(seconds) {
                // seconds = the current playback position
                if (seconds < currTime - .2 || seconds > currTime + .2) {
                    vimeoPlayer.setCurrentTime(currTime).then(function(seconds) {
                        // seconds = the actual time that the player seeked to

                    }).catch(function(error) {
                        switch (error.name) {
                            case 'RangeError':
                                // the time was less than 0 or greater than the video’s duration
                                console.log("the time was less than 0 or greater than the video’s duration")
                                break;
                            default:
                                // some other error occurred
                                break;
                        }
                    });
                }
            }).catch(function(error) {
                // an error occurred
                console.log("Error: Could not retrieve Vimeo player current time")
            });

            break;
        case 3:
            var clientTime = media.currentTime
            if (clientTime < currTime - .2 || clientTime > currTime + .2) {
                media.currentTime = currTime
            }
            // playOther(roomnum)
            break;
    }
});

// Needs to grab the next video id and change the video
function playNext(room) {
    socket.emit('play next', {}, function(data) {
        var videoId = data.videoId

        // IF queue is empty do not try to change
        if (videoId !== "QUEUE IS EMPTY") {
            // Change the video
            socket.emit('change video', {
                room: roomnum,
                videoId: videoId,
                time: 0
            })
        } else {
            playNextAlert()
        }
    })
}
});
