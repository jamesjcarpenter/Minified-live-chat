window.addEventListener('load', () => {
  // Chat platform

  // Local Video
  const localImageEl = $('#local-image');
  const localVideoEl = $('#local-video');

  // Remote Videos
  const remoteVideosEl = $('#remote-videos');
  let remoteVideosCount = 0;

  // Hide cameras until they are initialized
  localVideoEl.hide();
  
  var socket = io.connect('http://localhost:3000');

  // on connection to server, ask for user's name with an anonymous callback
socket.on('connect', function(){
  // call the server-side function 'adduser' and send one parameter (value of prompt)
  socket.emit('adduser', prompt("What's your name?"));
});

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
  $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
});

// listener, whenever the server emits 'updaterooms', this updates the room the client is in
socket.on('updaterooms', function(rooms, current_room) {
  $('#rooms').empty();
  $.each(rooms, function(key, value) {
    if(value == current_room){
      $('#rooms').append('<div>' + value + '</div>');
    }
    else {
      $('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
    }
  });
});

function switchRoom(room){
  socket.emit('switchRoom', room);
}

// on load of page
$(function(){
  // when the client clicks SEND
  $('#datasend').click( function() {
    var message = $('#data').val();
    $('#data').val('');
    // tell server to execute 'sendchat' and send along one parameter
    socket.emit('sendchat', message);
  });

  // when the client hits ENTER on their keyboard
  $('#data').keypress(function(e) {
    if(e.which == 13) {
      $(this).blur();
      $('#datasend').focus().click();
    }
  });
});

  // toggle sidebar


  // Add validation rules to Create/Join Room Form

  // create our webrtc connection
  const webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'local-video',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remote-videos',
    // immediately ask for camera access
    autoRequestMedia: true,
    debug: false,
    detectSpeakingEvents: true,
    autoAdjustMic: false,
  });

  // We got access to local camera
  webrtc.on('localStream', () => {
    localImageEl.hide();
    localVideoEl.show();
  //  webrtc.joinRoom(roomName);
  //  postMessage(`${username} joined chatroom`);
  });

  // Remote video was added
  webrtc.on('videoAdded', (video, peer) => {
    // eslint-disable-next-line no-console
    const id = webrtc.getDomId(peer);
    const html = remoteVideoTemplate({ id });
    if (remoteVideosCount === 0) {
      remoteVideosEl.html(html);
    } else {
      remoteVideosEl.append(html);
    }
    $(`#${id}`).html(video);
    $(`#${id} video`).addClass('ui image medium'); // Make video element responsive
    remoteVideosCount += 1;
  });

  // Update Chat Messages
  const updateChatMessages = () => {
    const html = chatContentTemplate({ messages });
    const chatContentEl = $('#chat-content');
    chatContentEl.html(html);
    // automatically scroll downwards
    const scrollHeight = chatContentEl.prop('scrollHeight');
    chatContentEl.animate({ scrollTop: scrollHeight }, 'slow');
  };

  // Post Local Message
//  const postMessage = (message) => {
//    const chatMessage = {
//      username,
//      message,
////    };
    // Send to all peers
//    webrtc.sendToAll('chat', chatMessage);
    // Update messages locally
//    messages.push(chatMessage);
//    $('#post-message').val('');
//    updateChatMessages();
//  };

  // Display Chat Interface
//  const showChatRoom = (room) => {
//    formEl.hide();
//    const html = chatTemplate({ room });
//    chatEl.html(html);
//    const postForm = $('form');
//    postForm.form({
//      message: 'empty',
//    });
//    $('#post-btn').on('click', () => {
//      const message = $('#post-message').val();
//      postMessage(message);
//    });
//    $('#post-message').on('keyup', (event) => {
//      if (event.keyCode === 13) {
//        const message = $('#post-message').val();
//        postMessage(message);
//      }
//    });
//  };

  // Register new Chat Room


  // Join existing Chat Room
//  const joinRoom = (roomName) => {
    // eslint-disable-next-line no-console
  //  console.log(`Joining Room: ${roomName}`);
  //  webrtc.joinRoom(roomName);
//    showChatRoom(roomName);
  //  postMessage(`${username} joined chatroom`);
//  };

  // Receive message from remote user
//  webrtc.connection.on('message', (data) => {
  //  if (data.type === 'chat') {
    //  const message = data.payload;
//      messages.push(message);
//      updateChatMessages();
//    }
//  });

  // Room Submit Button Handler
  window.addEventListener('load', () => {
    username = $('#username').val();
    const roomName = $('#roomName').val().toLowerCase();
  });
  $('.jiggle .placeholder')
  .transition({
    animation : 'jiggle',
    duration  : 1300,
  });
  
  $('.jiggle #local-video')
  .transition({
    animation : 'jiggle',
    duration  : 1300,
  });
  $('.ui.checkbox')
  .checkbox()
;
});
$('.event .content .summary .date .ui #newmsg')
.transition({
  animation : 'fly in',
  duration  : 1200,
});
