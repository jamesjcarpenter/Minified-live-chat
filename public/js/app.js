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
    socket.room = {};
    var roomId = url.substr(url.lastIndexOf("=")+1);
    socket.room = roomId;
    // console.log("roomId : "+roomId);
    //event to get chat history on button click or as room is set.
     socket.emit('join', roomId);
  
  // call the server-side function 'adduser' and send one parameter (value of prompt)
  socket.emit('adduser', prompt("Enter username."));
      //empty messages.
      socket.on('askForUserId', () => {
        socket.emit(socket.id);
      });

      socket.on('private-message', (data, message) => {
        console.log('You received a message');
        console.log(message.data);
        });
    //   socket.emit('adduser',
    //   $('.ui.mini.basic.modal.start')
    //   .modal({  
    //     blurring: true,
    //     closable  : false,
    //     onDeny    : function(){
    //       window.alert('Wait not yet!');
    //       return false;
    //     },
    //     onApprove : function() {
    //       socket.username = $('#addusername').val();
    //       window.close();
    //     }
    // 
    // 
    //   }).modal('show'));
    // });
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
			$('#userlist').append('<div id="connecteduser"name="' + socket.username + '">' + '<div id="keyUse"name="' + socket.id  + '">' + key + '</div>' + '&nbsp;&nbsp;' + '<i class="small circle icon green"></i><div name="' + socket.username + '" class="ui mini button pm"><span class="ui medium blue text">PM</span></div></div>');
      console.log($('.ui.mini.button.pm').attr('name'))
      
      $('.ui.mini.button.pm').click(function() {
        // $("#PMbutton").unbind();
        $(".ui.mini.button.pm").each(function(){
          var userToPM;
          userToPM = $('.ui.mini.button.pm').attr('name')
          console.log(userToPM);
          socket.emit('private-message', data, message, userToPM);
          });
        });
          socket.on('msgStart', function() {
              console.log(userToPM);
            });
    });
  });
  
      // function addBack(){
    //   $('#conversation').append('<span class="ui small white text"id="messagingthem">Messaging' + key + '</span>')
    //   $('#conversation').append('<div class="ui mini button"id="goback">go back</div>');
    //   $('#messagingthem').hide();
    //   $('#goback').hide();
    // };
    //   $(document).ready(function(){ 
    // 
    //   $(".ui.mini.button.pm").each(function(){
    //     var userToPM = $(this).attr('id');
    //     console.log(userToPM);
    //    $('.ui.mini.button.pm').click(function() {
    //      // $("#PMbutton").unbind();
    //      addBack();
    //      console.log(userToPM);
    //      return false; 
    //      $('.ui.left.pointing.label').hide();
    //      $('#messagingthem').show();
    //      $('#PMbutton').hide();
    // 
    //      $( "#userlist").find(userId).text();
    //       socket.emit('private-message', userId);
    // 
    //     $('#data').keypress(function(e) {
    //     if(e.which == 13) {
    //         $(this).blur();
    //         $('#datasend').focus().click();
    //         var message = $('#data').val().trim();

  //        };
  //      });
  //    });
  // 
  //         $('#goback').click(function() {
  //            $('.ui.left.pointing.label').show();
  //            $('#PMbutton').show();
  //            $('#messagingthem').hide();
  //            $('#goback').hide();
  //            $('#scrollable').animate({ scrollTop: 		$('#scrollable').prop('scrollHeight')}, 300);
  //          });
  //      });
  //    });
  //       // socket.emit('private-message', message);
  // 
	// 	});
	// });
  
  // create our webrtc connection
  socket.on('updatechat', function (username, data) {
    $('#conversation').append('<div class="ui container"><div class="ui medium basic segment"></div></div>');
    $('#scrollable').animate({ scrollTop: 		$('#scrollable').prop('scrollHeight')}, 300);
    $("#data").focus();
    // $('#usercam').empty().append($('<span class="ui text small "></span>').text(username));
    $('#conversation').append($('<img id="useravatar" class="ui avatar image" src="/images/avatarsmall.jpg"></img><tag id="username"name="avatar"><span class="ui small text"><samp></samp></span></tag>').text(username));
    $('#conversation').append($('<span class="ui small text" id="date"name="date"></span>').text(JSON.parse(date)));
    $('#conversation').append($('<div class="ui left pointing label"id="message"name="data"><div id="messagedata"><p class="messaging"><span class="ui small text"></span></p></div></div>').text(data));
    replaceUrl();
  });
  
  function replaceUrl() {
    
    $(".ui.left.pointing.label").each(function(){
        $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ') );
      });
      
    };
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
      
      
      // document.getElementById("#data").value = '<div class="ui left pointing label"id="emojimsg"><img id="joyImg" src="images/images/joy.png" /></div>'
    //   var re = new RegExp(/(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/); 
    //   var str = '' + msgUrl;
    //   if (re.test(message)) {
    //     message = str.replace(re)
    //   };
    // 
    //   $("#autlink").each(function(){
    //     $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ') );
    // });

      
      var map = {
        "<3": "\u2764\uFE0F",
        "</3": "\uD83D\uDC94",
        ":D": "\uD83D\uDE02",
        ":)": "\uD83D\uDE00",
        ";)": "\uD83D\uDE09",
        ":(": "\u2639\uFE0F",
        ":p": "\uD83D\uDE0B",
        ";p": "\uD83D\uDE1C",
        ":'(": "\uD83D\uDE22",
        "8)": "\uD83D\uDE0E"
      };
      
      function escapeSpecialChars(regex) {
        return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
      }
      
      document.getElementById('data').oninput = function() {
        for (var i in map) {
          var regex = new RegExp(escapeSpecialChars(i), 'gim');
          this.value = this.value = this.value.replace(regex, map[i]);
        }
      };
      
      // var re = new RegExp(/:\)|:-\)|:\(|:-\(|;\);-\)|:-O|8-|:P|:D|:\||:S|:\$|:@|8o\||\+o\(|\(H\)|\(C\)|\(\?\)/g); 
      // var str = '';
      // if (re.test(message)) {
      //   message = str.replace(emote, str);
      //   socket.emit('sendchat', message);
      // };
      // tell server to execute 'sendchat' and send along one parameter
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
    		socket.emit('updateusers', socket.usernames);
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
