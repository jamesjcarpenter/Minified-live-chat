window.addEventListener('load', () => {
  // Chat platform
  // Local Video


  // toggle sidebar
var socket = io.connect('anomic.io/room');

  // Add validation rules to Create/Join Room Form
  var usernames = {};
  var rooms = require("./models/roomschema");
  io.sockets.on('connection', function (socket) {

  	// when the client emits 'adduser', this listens and executes
  	socket.on('adduser', function(req, res){
  		// store the username in the socket session for this client
  		// store the room name in the socket session for this client
  		socket.room = 'room1';
  		// send client to room 1
  		socket.join('room1');
  		// echo to client they've connected
  		io.emit('updatechat', 'SERVER', 'connected to room1');
  		// echo to room 1 that a person has connected to their room
  		socket.broadcast.to('room1').emit('updatechat', 'SERVER', user.name + ' has connected to this room');
  		socket.emit('updaterooms', rooms, 'room1');
  	});

    function sendHeartbeat(){
        setTimeout(sendHeartbeat, 8000);
        io.sockets.emit('ping', { beat : 1 });
    }
    
    io.sockets.on('connection', function (socket) {
        socket.on('pong', function(data){
            console.log("Pong received from client");
        });
    })
    
    setTimeout(sendHeartbeat, 8000);

  	// when the client emits 'sendchat', this listens and executes
  	socket.on('sendchat', function (data) {
  		// we tell the client to execute 'updatechat' with 2 parameters
  		io.emit('updatechat', user.name, data);
  	});

  	socket.on('switchRoom', function(newroom){
  		// leave the current room (stored in session)
  		socket.leave(socket.room);
  		// join new room, received as function parameter
  		socket.join(newroom);
  		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
  		// sent message to OLD room
  		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', user.name + ' has left this room');
  		// update socket session room title
  		socket.room = newroom;
  		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', user.name + ' has joined this room');
  		socket.emit('updaterooms', rooms, newroom);
  	});

  	// when the user disconnects.. perform this
  	socket.on('disconnect', function(){
  		// remove the username from global usernames list
  		delete usernames[user.name];
  		// update list of users in chat, client-side
  		io.sockets.emit('updateusers', usernames);
  		// echo globally that this client has left
  		socket.broadcast.emit('updatechat', user.name + ' has disconnected');
  		socket.leave(socket.room);
  	});
  });
  // create our webrtc connection

  // listener, whenever the server emits 'updaterooms', this updates the room the client is in

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
  socket.on('updateroomusers', function(roomusers) {
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

    function switchRoom(room){
      socket.broadcast.emit('switchRoom', room);
    }

  socket.on('onlineStack',function(stack){
     $('#list').empty();
     $('#list').append($('<li>').append($('<button id="ubtn" class="btn btn-danger btn-block btn-lg"></button>').text("Group").css({"font-size":"18px"})));
     var totalOnline = 0;
     for (var user in stack){
       //setting txt1. shows users button.
       if(user == username){
         var txt1 = $('<button class="boxF disabled"> </button>').text(user).css({"font-size":"18px"});
       }
       else{
         var txt1 = $('<button id="ubtn" class="btn btn-success  btn-md">').text(user).css({"font-size":"18px"});
       }
       //setting txt2. shows online status.
       if(stack[user] == "Online"){
         var txt2 = $('<span class="badge"></span>').text("*"+stack[user]).css({"float":"right","color":"#009933","font-size":"18px"});
         totalOnline++;

       }
       else{
         var txt2 = $('<span class="badge"></span>').text(stack[user]).css({"float":"right","color":"#a6a6a6","font-size":"18px"});
       }
       //listing all users.
       $('#list').append($('<li>').append(txt1,txt2));
       $('#totalOnline').text(totalOnline);
     }//end of for.
     $('#scrl1').scrollTop($('#scrl1').prop("scrollHeight"));
   }); //end of receiving onlineStack event.

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

var designer = new CanvasDesigner();

// both links are mandatory
// widget.html will internally use widget.js
designer.widgetHtmlURL = 'https://www.webrtc-experiment.com/Canvas-Designer/widget.html'; // you can place this file anywhere
designer.widgetJsURL = 'https://www.webrtc-experiment.com/Canvas-Designer/widget.js';     // you can place this file anywhere

// <iframe> will be appended to "document.body"
designer.appendTo(document.body.inner|| document.documentElement);
