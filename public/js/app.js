window.addEventListener('load', () => {
  
  // Chat platform
  // Local Video
$('#start').click();
$('#start').hide();
$('#bitrateset').hide();
$('#start2').click();
$('#start2').hide();
var url = window.location.href;

console.log(url);
function getImageDirectoryByFullURL(url){
    return url.substr(url.lastIndexOf("=")+1);
}
console.log(url.substr(url.lastIndexOf("=")+1));

$('#copyinput').val($('#copyinput').val() + '' + window.location.href);
$("#data").focus();

$('#youtubeopen').click( function() {
  $('.ui.longer.modal').modal('show');
});


  


    document.getElementById('themecss').href = 'css/indextheme2.css';
    $('.ui.button').addClass('inverted');
    $('.icon').addClass('inverted');
    $('.ui.medium.left.pointing.label').addClass('inverted');
    $('.large.ui.teal.secondary.button.inverted').removeClass('large ui teal').addClass('large ui black');
    $('#cpybutton').removeClass('ui teal').addClass('ui black');
    
    
    // document.getElementById('themechange').onclick = function () { 
    //     document.getElementById('themecss').href = 'css/indextheme.css';
    //     $('.ui.button').removeClass('inverted');
    //     $('.icon').removeClass('inverted');
    //     $('.ui.medium.left.pointing.label').removeClass('inverted');
    //     $('.large.ui.teal.secondary.button.inverted').addClass('large ui teal').removeClass('large ui black');
    //     $('#cpybutton').removeClass('ui teal').removeClass('ui black');
    // };

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
      //empty messages.
      socket.on('askForUserId', () => {
        socket.emit(socket.id);
      });

      socket.on('private-message', (data, message) => {
        console.log('You received a message');
        console.log(message.data);
        });
      
      socket.room = {};
      var roomId = url.substr(url.lastIndexOf("=")+1);
      socket.room = roomId;
      // console.log("roomId : "+roomId);
      //event to get chat history on button click or as room is set.
       socket.emit('join', roomId);
    
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		socket.emit('adduser', prompt("Enter username."));
	});
  
  // socket.on('addname', function (username) {
  //  $('#videolocal').append($('<span class="ui text small"id="camusername"></span>').text(username));
  // 
  // });
  
  console.log(Object.keys.usernames);
  // socket.on('getusers', function (usernames) {
  //   for(key in usernames) {
  //   if(usernames.hasOwnProperty(key)) {
  //       var value = usernames[key];
  //       //do something with value;
  //     }
  //   }
  //  $('#userlist').append($('<div class="item"><span class="ui text small"></span></div>').text(usernames));
  // 
  // });
  
  socket.on('updateusers', function(data) {
		$('#userlist').empty();
    $('#userlist').append('<div class="list-group-item-heading"><span class="ui text">' + 'USERS' + '&nbsp;#' + '' + socket.room + '</span></div>');
		$.each(data, function(key, value) {
			$('#userlist').append('<div id="connecteduser">' + '<div id="keyUse">' + key + '</div>' + '&nbsp;&nbsp;' + '<i class="small circle icon green"></i><div class="ui mini button"id="PMbutton"><span class="ui medium blue text">PM</span></div></div>');
      
      
      function addBack(){
      $('#conversation').append('<span class="ui small white text"id="messagingthem">Messaging' + key + '</span>')
      $('#conversation').append('<div class="ui mini button"id="goback">go back</div>');
      $('#messagingthem').hide();
      $('#goback').hide();
    };
      
      $(document).ready(function(){ 
        
       $('#PMbutton').click(function() {
         // $("#PMbutton").unbind();
         addBack();
         $('#messages').hide();
         $('#messagingthem').show();
         $('#goback').show();
         $('#PMbutton').hide();

         $( "#userlist").find(userId).text();
         socket.emit('private-message', userId);
         
        $('#data').keypress(function(e) {
        if(e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
            var message = $('#data').val().trim();
           socket.emit('private-message', message);
         };
       });
         
         
          $('#goback').show();
          $('#goback').click(function() {
             $('#messages').show();
             $('#PMbutton').show();
             $('#messagingthem').hide().remove();
             $('#goback').hide().remove();
             $('#scrollable').animate({ scrollTop: 		$('#scrollable').prop('scrollHeight')}, 300);
           });
       });
     });
        // socket.emit('private-message', message);
      
		});
	});
  
  // create our webrtc connection
  socket.on('updatechat', function (username, data) {
    
    $('#conversation').append('<div class="ui container"><div class="ui medium basic segment"></div></div>');
    $('#scrollable').animate({ scrollTop: 		$('#scrollable').prop('scrollHeight')}, 300);
    $("#data").focus();
    // $('#usercam').empty().append($('<span class="ui text small "></span>').text(username));
    $('#conversation').append($('<img id="useravatar" class="ui avatar image" src="/images/avatarsmall.jpg"></img><tag id="username"name="avatar"><span class="ui small text"><samp></samp></span></tag>').text(username));
    $('#conversation').append($('<span class="ui small text" id="date"name="date"></span>').text(JSON.parse(date)));
    $('#conversation').append($('<div class="ui left pointing label"id="message"name="data"><div id="messagedata"><p><span class="ui small text"></span></p></div></div>').text(data));
    
    // $(function() {
    // var text = $("#data").html();
    // text = text.replace(':D', '&#9786;').replace('&lt;3', '&#9829;');
    // $("#data").html(text);
    //   $("#message").replaceWith("<div class='ui left pointing label'id='emojimsg'><img id='joyImg' src='images/images/joy.png' /></div>");
    // });
    // 
  });
  

  // listener, whenever the server emits 'updaterooms', this updates the room the client is in
  socket.on('serverupdatechat', function (server, username, data) {
    $('#conversation').append('<div class="ui container"><div class="ui small basic segment"></div></div>');
        $('#scrollable').animate({ scrollTop: 		$('#scrollable').prop('scrollHeight')}, 1100);
        $('#conversation').append($('<div class="ui small grey label"id="servermessage"><span class="ui small text"></span></div>').text(server));
        $("#roomname").empty();
        $("#roomname").append('<span class="ui medium text" id="roomname"><div class="ui grey label"id="roomname">Room #'+ '' + url.substr(url.lastIndexOf("=")+1) + '</span></div>');
          });
//$('#publisher').append('<h4>' + username + '</h4>');

  // on load of page
socket.on('connect', function(data) {
    // when the client clicks SEND
    $('#datasend').click( function() {
      var message = $('#data').val().trim();
      $('#data').val('');
    
      $.emote.path = '/images/images/';
      $.emote.icons = {
          ':smile:'     : 'smile.png',
          ':angry:'     : 'angry.png',
          ':flushed:'   : 'flushed.png',
          ':neckbeard:' : 'neckbeard.png',
          ':laughing:'  : 'laughing.png'
      };
      
        var re = new RegExp(/:\)|:-\)|:\(|:-\(|;\);-\)|:-O|8-|:P|:D|:\||:S|:\$|:@|8o\||\+o\(|\(H\)|\(C\)|\(\?\)/g); 
        var str = $.emote.icons;
        if (re.test(message)) {
          message = str.replace(re);
        };
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
  $('#conversation').emojiarea()
  
  $.emojiarea.path = '/images/images/';
  $.emojiarea.icons = {
      ':smile:'     : 'smile.png',
      ':angry:'     : 'angry.png',
      ':flushed:'   : 'flushed.png',
      ':neckbeard:' : 'neckbeard.png',
      ':laughing:'  : 'laughing.png'
  };
  
  socket.on('updateroomusers', function(roomusers, username) {
  $("#roomusers").empty();
  $.each(roomusers, function (key, value) {
  $('#roomusers').append('+value+');
  });
  });
  
  $('#data').keyup(function(){
    if($('#data').val()){
      $('#datasend').show(); //showing send button.
      socket.emit('typing');
    }
    else{
      $('#datasend').hide(); //hiding send button to prevent sending empty messages.
    }
  });
  
  socket.on('typing',function(message){
    var setTime;
    //clearing previous setTimeout function.
    clearTimeout(setTime);
    //showing typing message.
    $('#typing').append('<div class="ui text container"><span class="ui small text" id="typing">' + '' + '</span></div>').text(message);
    //showing typing message only for few seconds.
    setTime = setTimeout(function(){
      $('#typing').empty();
    },3500);
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

    socket.on('disconnect', function(){
    		// remove the username from global usernames list
    		// update list of users in chat, client-side
    		socket.emit('updateusers', usernames);
    		// echo globally that this client has left
    		socket.broadcast.emit('serverupdatechat', '' + socket.username + ' has disconnected');
    		socket.leave(socket.room);
        delete socket.usernames[socket.username];
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
 // var roomusers = [];
 //  // get all the clients in ‘room1′
 //  // var clients = io.sockets.adapter.rooms[];
 //  var clients;
 //  // clients.length;
 //  // loop through clients in ‘room1′ and add their usernames to the roomusers array
 // for(var i = 0; i < clients.length; i++) {
 //  roomusers[roomusers.length] = clients[i].username;
 //  }
 //  // broadcast to everyone in room 1 the usernames of the clients connected.
 //  io.sockets.to(socket.room).emit('updateroomusers', roomusers);
  
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

//   $('.jiggle .placeholder')
//   .transition({
//     animation : 'jiggle',
//     duration  : 1300,
//   });
// 
//   $('.jiggle #local-video')
//   .transition({
//     animation : 'jiggle',
//     duration  : 1300,
//   });
//   $('.ui.checkbox')
//   .checkbox()
// ;
// });
// $('.event .content .summary .date .ui #newmsg')
// .transition({
//   animation : 'fly in',
//   duration  : 1200,
// });

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
});
