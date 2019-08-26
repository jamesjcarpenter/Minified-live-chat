window.addEventListener('load', () => {
  
  
  var socket = io.connect('https://anomic.io/443');
  
  // Chat platform
  // Local Video
$('#start').click();
$('#start').hide();
$('#bitrateset').hide();


$("#data").focus();

document.getElementById('themechanger').onclick = function () { 
    document.getElementById('themecss').href = 'css/indextheme2.css';
    $('.ui.button').addClass('inverted');
    $('.icon').addClass('inverted');
    $('.ui.medium.left.pointing.label').addClass('inverted');
    $('.large.ui.teal.secondary.button.inverted').removeClass('large ui teal').addClass('large ui black');
    $('#cpybutton').removeClass('ui teal').addClass('ui black');
};

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

var date = JSON.stringify(new Date(Date.now()).toLocaleTimeString())
  // toggle sidebar
var socket = io.connect('anomic.io/');

  // Add validation rules to Create/Join Room Form
  socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
    socket.emit('adduser',
    $('.ui.modal')
    .modal({  
      blurring: true,
      closable  : false,
      onDeny    : function(){
        window.alert('Wait not yet!');
        return false;
      },
      onApprove : function() {
        $('#usercam').append('<h6></h6>').text(user.username);
        window.close();
      }
    
    }).modal('show'));
	});
  // create our webrtc connection
  socket.on('updatechat', function (username, data) {
    $('#conversation').append('<div class="ui container"><div class="ui medium basic segment"></div></div>');
    $('#scrollable').animate({ scrollTop: 		$('#scrollable').prop('scrollHeight')}, 100);
    $("#data").focus();
    $('#conversation').append($('<img id="useravatar" class="ui avatar image" src="/images/avatarsmall.jpg"></img><tag id="username"><h6></h6></tag>').text(username));
    $('#conversation').append($('<span class="ui small text" id="date"></span>').text(JSON.parse(date)));
    $('#conversation').append($('<div class="ui left pointing label"id="message"><div id="messagedata"><p></p></div></div>').text(data));
    
  });
  // listener, whenever the server emits 'updaterooms', this updates the room the client is in
  socket.on('serverupdatechat', function (server) {
    $('#conversation').append('<div class="ui container"><div class="ui medium basic segment"></div></div>');
        $('#scrollable').animate({ scrollTop: 		$('#scrollable').prop('scrollHeight')}, 100);
        $('#conversation').append($('<div class="ui large grey label"id="servermessage"><p></p></div>').text(server));
          });
//$('#publisher').append('<h4>' + username + '</h4>');

  // on load of page
socket.on('connect', function(data) {
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
  socket.on('updateroomusers', function(roomusers, username) {
  $("#roomusers").empty();
  $.each(roomusers, function (key, value) {
  $('#roomusers').append('+value+');
  });
  });
  
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

    // function switchRoom(room){
    //   socket.broadcast.emit('switchRoom', room);
    // }

  // socket.on('onlineStack',function(stack){
  //    $('#list').empty();
  //    $('#list').append($('<li>').append($('<button id="ubtn" class="btn btn-danger btn-block btn-lg"></button>').text("Group").css({"font-size":"18px"})));
  //    var totalOnline = 0;
  //    for (var user in stack){
  //      //setting txt1. shows users button.
  //      if(user == username){
  //        var txt1 = $('<button class="boxF disabled"> </button>').text(user).css({"font-size":"18px"});
  //      }
  //      else{
  //        var txt1 = $('<button id="ubtn" class="btn btn-success  btn-md">').text(user).css({"font-size":"18px"});
  //      }
  //      //setting txt2. shows online status.
  //      if(stack[user] == "Online"){
  //        var txt2 = $('<span class="badge"></span>').text("*"+stack[user]).css({"float":"right","color":"#009933","font-size":"18px"});
  //        totalOnline++;
  // 
  //      }
  //      else{
  //        var txt2 = $('<span class="badge"></span>').text(stack[user]).css({"float":"right","color":"#a6a6a6","font-size":"18px"});
  //      }
  //      //listing all users.
  //      $('#list').append($('<li>').append(txt1,txt2));
  //      $('#totalOnline').text(totalOnline);
  //    }//end of for.
  //    $('#scrl1').scrollTop($('#scrl1').prop("scrollHeight"));
  //  }); //end of receiving onlineStack event.

  // create an array to hold all the usernames of the poeple in a specific room
//  var roomusers = [];
  // get all the clients in ‘room1′
//  var clients = io.sockets.adapter.rooms['r9k'];
//  clients.length;
  // loop through clients in ‘room1′ and add their usernames to the roomusers array
//  for(var i = 0; i < clients.length; i++) {
//  roomusers[roomusers.length] = clients[i].username;
//  }
  // broadcast to everyone in room 1 the usernames of the clients connected.
//  io.sockets.to('r9k').emit('updateroomusers', roomusers);
  
  //index.html code


  //Post Local Message


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
//    webrtc.connection.on('message', (data) => {
//    if (data.type === 'chat') {
//      const message = data.payload;
//      messages.push(message);
//      updateChatMessages();
//   }
//  });

  // Room Submit Button Handler

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

window.onunload = function() {
    $('#start').show();
    $('#start').click();
}


var designer = new CanvasDesigner();

// both links are mandatory
// widget.html will internally use widget.js
designer.widgetHtmlURL = 'https://www.webrtc-experiment.com/Canvas-Designer/widget.html'; // you can place this file anywhere
designer.widgetJsURL = 'https://www.webrtc-experiment.com/Canvas-Designer/widget.js';     // you can place this file anywhere

// <iframe> will be appended to "document.body"
designer.appendTo(document.body.inner|| document.documentElement);
