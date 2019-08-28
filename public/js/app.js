window.addEventListener('load', () => {
  
  
  var socket = io.connect('anomic.io/443');
  
  // Chat platform
  // Local Video
$('#start').click();
$('#start').hide();
$('#bitrateset').hide();

var url = window.location.href;

console.log(url);
function getImageDirectoryByFullURL(url){
    return url.substr(url.lastIndexOf("=")+1);
}
console.log(url.substr(url.lastIndexOf("=")+1));


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
		socket.emit('adduser', prompt("Enter username."));
	});
  // create our webrtc connection
  socket.on('updatechat', function (username, data) {
    $('#conversation').append('<div class="ui container"><div class="ui medium basic segment"></div></div>');
    $('#scrollable').animate({ scrollTop: 		$('#scrollable').prop('scrollHeight')}, 100);
    $("#data").focus();
    $('#usercam').empty().append($('<span class="ui text small "></span>').text(username));
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
  $ (function(){
  
    var socket = io('/chat');
  
    var username = $('#user').val();
    var noChat = 0; //setting 0 if all chats histroy is not loaded. 1 if all chats loaded.
    var msgCount = 0; //counting total number of messages displayed.
    var oldInitDone = 0; //it is 0 when old-chats-init is not executed and 1 if executed.
    var roomId;//variable for setting room.
    var toUser;
  
    //passing data on connection.
    socket.on('connect',function(){
      socket.emit('set-user-data',username);
      // setTimeout(function() { alert(username+" logged In"); }, 500);
  
      socket.on('broadcast',function(data){
      document.getElementById("hell0").innerHTML += '<li>'+ data.description +'</li>';
      // $('#hell0').append($('<li>').append($(data.description).append($('<li>');
      $('#hell0').scrollTop($('#hell0')[0].scrollHeight);
  
  });
  
    });//end of connect event.
  
  
  
    //receiving onlineStack.
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
  
  
    //on button click function.
    $(document).on("click","#ubtn",function(){
  
      //empty messages.
      $('#messages').empty();
      $('#typing').text("");
      msgCount = 0;
      noChat = 0;
      oldInitDone = 0;
  
      //assigning friends name to whom messages will send,(in case of group its value is Group).
      toUser = $(this).text();
  
      //showing and hiding relevant information.
      $('#frndName').text(toUser);
      $('#initMsg').hide();
      $('#chatForm').show(); //showing chat form.
      $('#sendBtn').hide(); //hiding send button to prevent sending of empty messages.
  
      //assigning two names for room. which helps in one-to-one and also group chat.
      if(toUser == "Group"){
        var currentRoom = "Group-Group";
        var reverseRoom = "Group-Group";
      }
      else{
        var currentRoom = username+"-"+toUser;
        var reverseRoom = toUser+"-"+username;
      }
  
      //event to set room and join.
      socket.emit('set-room',{name1:currentRoom,name2:reverseRoom});
  
    }); //end of on button click event.
  
    //event for setting roomId.
    socket.on('set-room',function(room){
      //empty messages.
      $('#messages').empty();
      $('#typing').text("");
      msgCount = 0;
      noChat = 0;
      oldInitDone = 0;
      //assigning room id to roomId variable. which helps in one-to-one and group chat.
      roomId = room;
      console.log("roomId : "+roomId);
      //event to get chat history on button click or as room is set.
      socket.emit('old-chats-init',{room:roomId,username:username,msgCount:msgCount});
  
    }); //end of set-room event.
  
    //on scroll load more old-chats.
    $('#scrl2').scroll(function(){
  
      if($('#scrl2').scrollTop() == 0 && noChat == 0 && oldInitDone == 1){
        $('#loading').show();
        socket.emit('old-chats',{room:roomId,username:username,msgCount:msgCount});
      }
  
    }); // end of scroll event.
    socket.on('connectToRoom',function(data) {
           document.body.innerHTML = '';
           document.write(data);
        });
    //listening old-chats event.
    socket.on('old-chats',function(data){
  
      if(data.room == roomId){
        oldInitDone = 1; //setting value to implies that old-chats first event is done.
        if(data.result.length != 0){
          $('#noChat').hide(); //hiding no more chats message.
          for (var i = 0;i < data.result.length;i++) {
            //styling of chat message.
            var chatDate = moment(data.result[i].createdOn).format("MMMM Do YYYY, hh:mm:ss a");
            var txt1 = $('<span></span>').text(data.result[i].msgFrom+" : ").css({"color":"#006080"});
            var txt2 = $('<span></span>').text(chatDate).css({"float":"right","color":"#a6a6a6","font-size":"16px"});
            var txt3 = $('<p></p>').append(txt1,txt2);
            var txt4 = $('<p></p>').text(data.result[i].msg).css({"color":"#000000"});
            //showing chat in chat box.
            $('#messages').prepend($('<li>').append(txt3,txt4));
            msgCount++;
  
          }//end of for.
          console.log(msgCount);
        }
        else {
          $('#noChat').show(); //displaying no more chats message.
          noChat = 1; //to prevent unnecessary scroll event.
        }
        //hiding loading bar.
        $('#loading').hide();
  
        //setting scrollbar position while first 5 chats loads.
        if(msgCount <= 5){
          $('#scrl2').scrollTop($('#scrl2').prop("scrollHeight"));
        }
      }//end of outer if.
  
    }); // end of listening old-chats event.
  
    // keyup handler.
    $('#myMsg').keyup(function(){
      if($('#myMsg').val()){
        $('#sendBtn').show(); //showing send button.
        socket.emit('typing');
      }
      else{
        $('#sendBtn').hide(); //hiding send button to prevent sending empty messages.
      }
    }); //end of keyup handler.
  
    //receiving typing message.
    socket.on('typing',function(msg){
      var setTime;
      //clearing previous setTimeout function.
      clearTimeout(setTime);
      //showing typing message.
      $('#typing').text(msg);
      //showing typing message only for few seconds.
      setTime = setTimeout(function(){
        $('#typing').text("");
      },3500);
    }); //end of typing event.
  
    //sending message.
    $('form').submit(function(){
      socket.emit('chat-msg',{msg:$('#myMsg').val(),msgTo:toUser,date:Date.now()});
      $('#myMsg').val("");
      $('#sendBtn').hide();
      return false;
    }); //end of sending message.
  
    //receiving messages.
    socket.on('chat-msg',function(data){
      //styling of chat message.
      var chatDate = moment(data.date).format("MMMM Do YYYY, hh:mm:ss a");
      var txt1 = $('<span></span>').text(data.msgFrom+" : ").css({"color":"#006080"});
      var txt2 = $('<span></span>').text(chatDate).css({"float":"right","color":"#a6a6a6","font-size":"16px"});
      var txt3 = $('<p></p>').append(txt1,txt2);
      var txt4 = $('<p></p>').text(data.msg).css({"color":"#000000"});
      //showing chat in chat box.
      $('#messages').append($('<li>').append(txt3,txt4));
        msgCount++;
        console.log(msgCount);
        $('#typing').text("");
        $('#scrl2').scrollTop($('#scrl2').prop("scrollHeight"));
    }); //end of receiving messages.
  
    //on disconnect event.
    //passing data on connection.
    socket.on('disconnect',function(){
  
  
      //showing and hiding relevant information.
      $('#list').empty();
      $('#messages').empty();
      $('#typing').text("");
      $('#frndName').text("Disconnected..");
      $('#loading').hide();
      $('#noChat').hide();
      $('#initMsg').show().text("...Please, Refresh Your Page...");
      $('#chatForm').hide();
      msgCount = 0;
      noChat = 0;
    });//end of connect event.
  
  
  
  });//end of function.

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
