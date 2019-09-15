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
    		io.sockets.emit('updateusers', usernames);
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

$(document).on("click","#emoji-picker",function(e){
   e.stopPropagation();
    $('.intercom-composer-emoji-popover').toggleClass("active");
});

$(document).click(function (e) {
    if ($(e.target).attr('class') != '.intercom-composer-emoji-popover' && $(e.target).parents(".intercom-composer-emoji-popover").length == 0) {
        $(".intercom-composer-emoji-popover").removeClass("active");
    }
});

$(document).on("click",".intercom-emoji-picker-emoji",function(e){
    $(".test-emoji").append($(this).html());
});

$('.intercom-composer-popover-input').on('input', function() {
    var query = this.value;
    if(query != ""){
      $(".intercom-emoji-picker-emoji:not([title*='"+query+"'])").hide();
    }
    else{
      $(".intercom-emoji-picker-emoji").show();
    }
});

$('body').append('<div class="test-emoji">😊😜😉😉😍😍😍😛😃😭😭😐😍😍😍😉😉😊😊😜😜😜🐍🐍🐢🐲🐲🐲🐷🐑🐣🐔🐲🐲🐲</div>
<div class="emoji-panel">
  <button id="emoji-picker" class="chat-input-tool"><svg preserveAspectRatio="xMidYMid" viewBox="0 0 24 24" style="width: 18px; height: 18px;"><path d="M12 24C5.38 24 0 18.62 0 12S5.38 0 12 0s12 5.38 12 12-5.38 12-12 12zm0-22C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-2.9 0-5.56-1.75-6.9-4.57-.24-.5-.03-1.1.47-1.33.5-.24 1.1-.03 1.33.47C7.9 16.67 9.86 18 12 18c2.15 0 4.1-1.3 5.1-3.43.23-.5.83-.7 1.33-.47.5.23.7.83.47 1.33C17.58 18.25 14.93 20 12 20zm4-8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#fff"></path></svg>
      </button></div><div class="intercom-composer-popover intercom-composer-emoji-popover"><div class="intercom-emoji-picker"><div class="intercom-composer-popover-header"><input class="intercom-composer-popover-input" placeholder="Search" value=""></div><div class="intercom-composer-popover-body-container"><div class="intercom-composer-popover-body"><div class="intercom-emoji-picker-groups"><div class="intercom-emoji-picker-group"><div class="intercom-emoji-picker-group-title">Frequently used</div><span class="intercom-emoji-picker-emoji" title="thumbs_up">👍</span><span class="intercom-emoji-picker-emoji" title="-1">👎</span><span class="intercom-emoji-picker-emoji" title="sob">😭</span><span class="intercom-emoji-picker-emoji" title="confused">😕</span><span class="intercom-emoji-picker-emoji" title="neutral_face">😐</span><span class="intercom-emoji-picker-emoji" title="blush">😊</span><span class="intercom-emoji-picker-emoji" title="heart_eyes">😍</span></div><div class="intercom-emoji-picker-group"><div class="intercom-emoji-picker-group-title">People</div><span class="intercom-emoji-picker-emoji" title="smile">😄</span><span class="intercom-emoji-picker-emoji" title="smiley">😃</span><span class="intercom-emoji-picker-emoji" title="grinning">😀</span><span class="intercom-emoji-picker-emoji" title="blush">😊</span><span class="intercom-emoji-picker-emoji" title="wink">😉</span><span class="intercom-emoji-picker-emoji" title="heart_eyes">😍</span><span class="intercom-emoji-picker-emoji" title="kissing_heart">😘</span><span class="intercom-emoji-picker-emoji" title="kissing_closed_eyes">😚</span><span class="intercom-emoji-picker-emoji" title="kissing">😗</span><span class="intercom-emoji-picker-emoji" title="kissing_smiling_eyes">😙</span><span class="intercom-emoji-picker-emoji" title="stuck_out_tongue_winking_eye">😜</span><span class="intercom-emoji-picker-emoji" title="stuck_out_tongue_closed_eyes">😝</span><span class="intercom-emoji-picker-emoji" title="stuck_out_tongue">😛</span><span class="intercom-emoji-picker-emoji" title="flushed">😳</span><span class="intercom-emoji-picker-emoji" title="grin">😁</span><span class="intercom-emoji-picker-emoji" title="pensive">😔</span><span class="intercom-emoji-picker-emoji" title="relieved">😌</span><span class="intercom-emoji-picker-emoji" title="unamused">😒</span><span class="intercom-emoji-picker-emoji" title="disappointed">😞</span><span class="intercom-emoji-picker-emoji" title="persevere">😣</span><span class="intercom-emoji-picker-emoji" title="cry">😢</span><span class="intercom-emoji-picker-emoji" title="joy">😂</span><span class="intercom-emoji-picker-emoji" title="sob">😭</span><span class="intercom-emoji-picker-emoji" title="sleepy">😪</span><span class="intercom-emoji-picker-emoji" title="disappointed_relieved">😥</span><span class="intercom-emoji-picker-emoji" title="cold_sweat">😰</span><span class="intercom-emoji-picker-emoji" title="sweat_smile">😅</span><span class="intercom-emoji-picker-emoji" title="sweat">😓</span><span class="intercom-emoji-picker-emoji" title="weary">😩</span><span class="intercom-emoji-picker-emoji" title="tired_face">😫</span><span class="intercom-emoji-picker-emoji" title="fearful">😨</span><span class="intercom-emoji-picker-emoji" title="scream">😱</span><span class="intercom-emoji-picker-emoji" title="angry">😠</span><span class="intercom-emoji-picker-emoji" title="rage">😡</span><span class="intercom-emoji-picker-emoji" title="triumph">😤</span><span class="intercom-emoji-picker-emoji" title="confounded">😖</span><span class="intercom-emoji-picker-emoji" title="laughing">😆</span><span class="intercom-emoji-picker-emoji" title="yum">😋</span><span class="intercom-emoji-picker-emoji" title="mask">😷</span><span class="intercom-emoji-picker-emoji" title="sunglasses">😎</span><span class="intercom-emoji-picker-emoji" title="sleeping">😴</span><span class="intercom-emoji-picker-emoji" title="dizzy_face">😵</span><span class="intercom-emoji-picker-emoji" title="astonished">😲</span><span class="intercom-emoji-picker-emoji" title="worried">😟</span><span class="intercom-emoji-picker-emoji" title="frowning">😦</span><span class="intercom-emoji-picker-emoji" title="anguished">😧</span><span class="intercom-emoji-picker-emoji" title="imp">👿</span><span class="intercom-emoji-picker-emoji" title="open_mouth">😮</span><span class="intercom-emoji-picker-emoji" title="grimacing">😬</span><span class="intercom-emoji-picker-emoji" title="neutral_face">😐</span><span class="intercom-emoji-picker-emoji" title="confused">😕</span><span class="intercom-emoji-picker-emoji" title="hushed">😯</span><span class="intercom-emoji-picker-emoji" title="smirk">😏</span><span class="intercom-emoji-picker-emoji" title="expressionless">😑</span><span class="intercom-emoji-picker-emoji" title="man_with_gua_pi_mao">👲</span><span class="intercom-emoji-picker-emoji" title="man_with_turban">👳</span><span class="intercom-emoji-picker-emoji" title="cop">👮</span><span class="intercom-emoji-picker-emoji" title="construction_worker">👷</span><span class="intercom-emoji-picker-emoji" title="guardsman">💂</span><span class="intercom-emoji-picker-emoji" title="baby">👶</span><span class="intercom-emoji-picker-emoji" title="boy">👦</span><span class="intercom-emoji-picker-emoji" title="girl">👧</span><span class="intercom-emoji-picker-emoji" title="man">👨</span><span class="intercom-emoji-picker-emoji" title="woman">👩</span><span class="intercom-emoji-picker-emoji" title="older_man">👴</span><span class="intercom-emoji-picker-emoji" title="older_woman">👵</span><span class="intercom-emoji-picker-emoji" title="person_with_blond_hair">👱</span><span class="intercom-emoji-picker-emoji" title="angel">👼</span><span class="intercom-emoji-picker-emoji" title="princess">👸</span><span class="intercom-emoji-picker-emoji" title="smiley_cat">😺</span><span class="intercom-emoji-picker-emoji" title="smile_cat">😸</span><span class="intercom-emoji-picker-emoji" title="heart_eyes_cat">😻</span><span class="intercom-emoji-picker-emoji" title="kissing_cat">😽</span><span class="intercom-emoji-picker-emoji" title="smirk_cat">😼</span><span class="intercom-emoji-picker-emoji" title="scream_cat">🙀</span><span class="intercom-emoji-picker-emoji" title="crying_cat_face">😿</span><span class="intercom-emoji-picker-emoji" title="joy_cat">😹</span><span class="intercom-emoji-picker-emoji" title="pouting_cat">😾</span><span class="intercom-emoji-picker-emoji" title="japanese_ogre">👹</span><span class="intercom-emoji-picker-emoji" title="japanese_goblin">👺</span><span class="intercom-emoji-picker-emoji" title="see_no_evil">🙈</span><span class="intercom-emoji-picker-emoji" title="hear_no_evil">🙉</span><span class="intercom-emoji-picker-emoji" title="speak_no_evil">🙊</span><span class="intercom-emoji-picker-emoji" title="skull">💀</span><span class="intercom-emoji-picker-emoji" title="alien">👽</span><span class="intercom-emoji-picker-emoji" title="hankey">💩</span><span class="intercom-emoji-picker-emoji" title="fire">🔥</span><span class="intercom-emoji-picker-emoji" title="sparkles">✨</span><span class="intercom-emoji-picker-emoji" title="star2">🌟</span><span class="intercom-emoji-picker-emoji" title="dizzy">💫</span><span class="intercom-emoji-picker-emoji" title="boom">💥</span><span class="intercom-emoji-picker-emoji" title="anger">💢</span><span class="intercom-emoji-picker-emoji" title="sweat_drops">💦</span><span class="intercom-emoji-picker-emoji" title="droplet">💧</span><span class="intercom-emoji-picker-emoji" title="zzz">💤</span><span class="intercom-emoji-picker-emoji" title="dash">💨</span><span class="intercom-emoji-picker-emoji" title="ear">👂</span><span class="intercom-emoji-picker-emoji" title="eyes">👀</span><span class="intercom-emoji-picker-emoji" title="nose">👃</span><span class="intercom-emoji-picker-emoji" title="tongue">👅</span><span class="intercom-emoji-picker-emoji" title="lips">👄</span><span class="intercom-emoji-picker-emoji" title="thumbs_up">👍</span><span class="intercom-emoji-picker-emoji" title="-1">👎</span><span class="intercom-emoji-picker-emoji" title="ok_hand">👌</span><span class="intercom-emoji-picker-emoji" title="facepunch">👊</span><span class="intercom-emoji-picker-emoji" title="fist">✊</span><span class="intercom-emoji-picker-emoji" title="wave">👋</span><span class="intercom-emoji-picker-emoji" title="hand">✋</span><span class="intercom-emoji-picker-emoji" title="open_hands">👐</span><span class="intercom-emoji-picker-emoji" title="point_up_2">👆</span><span class="intercom-emoji-picker-emoji" title="point_down">👇</span><span class="intercom-emoji-picker-emoji" title="point_right">👉</span><span class="intercom-emoji-picker-emoji" title="point_left">👈</span><span class="intercom-emoji-picker-emoji" title="raised_hands">🙌</span><span class="intercom-emoji-picker-emoji" title="pray">🙏</span><span class="intercom-emoji-picker-emoji" title="clap">👏</span><span class="intercom-emoji-picker-emoji" title="muscle">💪</span><span class="intercom-emoji-picker-emoji" title="walking">🚶</span><span class="intercom-emoji-picker-emoji" title="runner">🏃</span><span class="intercom-emoji-picker-emoji" title="dancer">💃</span><span class="intercom-emoji-picker-emoji" title="couple">👫</span><span class="intercom-emoji-picker-emoji" title="family">👪</span><span class="intercom-emoji-picker-emoji" title="couplekiss">💏</span><span class="intercom-emoji-picker-emoji" title="couple_with_heart">💑</span><span class="intercom-emoji-picker-emoji" title="dancers">👯</span><span class="intercom-emoji-picker-emoji" title="ok_woman">🙆</span><span class="intercom-emoji-picker-emoji" title="no_good">🙅</span><span class="intercom-emoji-picker-emoji" title="information_desk_person">💁</span><span class="intercom-emoji-picker-emoji" title="raising_hand">🙋</span><span class="intercom-emoji-picker-emoji" title="massage">💆</span><span class="intercom-emoji-picker-emoji" title="haircut">💇</span><span class="intercom-emoji-picker-emoji" title="nail_care">💅</span><span class="intercom-emoji-picker-emoji" title="bride_with_veil">👰</span><span class="intercom-emoji-picker-emoji" title="person_with_pouting_face">🙎</span><span class="intercom-emoji-picker-emoji" title="person_frowning">🙍</span><span class="intercom-emoji-picker-emoji" title="bow">🙇</span><span class="intercom-emoji-picker-emoji" title="tophat">🎩</span><span class="intercom-emoji-picker-emoji" title="crown">👑</span><span class="intercom-emoji-picker-emoji" title="womans_hat">👒</span><span class="intercom-emoji-picker-emoji" title="athletic_shoe">👟</span><span class="intercom-emoji-picker-emoji" title="mans_shoe">👞</span><span class="intercom-emoji-picker-emoji" title="sandal">👡</span><span class="intercom-emoji-picker-emoji" title="high_heel">👠</span><span class="intercom-emoji-picker-emoji" title="boot">👢</span><span class="intercom-emoji-picker-emoji" title="shirt">👕</span><span class="intercom-emoji-picker-emoji" title="necktie">👔</span><span class="intercom-emoji-picker-emoji" title="womans_clothes">👚</span><span class="intercom-emoji-picker-emoji" title="dress">👗</span><span class="intercom-emoji-picker-emoji" title="running_shirt_with_sash">🎽</span><span class="intercom-emoji-picker-emoji" title="jeans">👖</span><span class="intercom-emoji-picker-emoji" title="kimono">👘</span><span class="intercom-emoji-picker-emoji" title="bikini">👙</span><span class="intercom-emoji-picker-emoji" title="briefcase">💼</span><span class="intercom-emoji-picker-emoji" title="handbag">👜</span><span class="intercom-emoji-picker-emoji" title="pouch">👝</span><span class="intercom-emoji-picker-emoji" title="purse">👛</span><span class="intercom-emoji-picker-emoji" title="eyeglasses">👓</span><span class="intercom-emoji-picker-emoji" title="ribbon">🎀</span><span class="intercom-emoji-picker-emoji" title="closed_umbrella">🌂</span><span class="intercom-emoji-picker-emoji" title="lipstick">💄</span><span class="intercom-emoji-picker-emoji" title="yellow_heart">💛</span><span class="intercom-emoji-picker-emoji" title="blue_heart">💙</span><span class="intercom-emoji-picker-emoji" title="purple_heart">💜</span><span class="intercom-emoji-picker-emoji" title="green_heart">💚</span><span class="intercom-emoji-picker-emoji" title="broken_heart">💔</span><span class="intercom-emoji-picker-emoji" title="heartpulse">💗</span><span class="intercom-emoji-picker-emoji" title="heartbeat">💓</span><span class="intercom-emoji-picker-emoji" title="two_hearts">💕</span><span class="intercom-emoji-picker-emoji" title="sparkling_heart">💖</span><span class="intercom-emoji-picker-emoji" title="revolving_hearts">💞</span><span class="intercom-emoji-picker-emoji" title="cupid">💘</span><span class="intercom-emoji-picker-emoji" title="love_letter">💌</span><span class="intercom-emoji-picker-emoji" title="kiss">💋</span><span class="intercom-emoji-picker-emoji" title="ring">💍</span><span class="intercom-emoji-picker-emoji" title="gem">💎</span><span class="intercom-emoji-picker-emoji" title="bust_in_silhouette">👤</span><span class="intercom-emoji-picker-emoji" title="speech_balloon">💬</span><span class="intercom-emoji-picker-emoji" title="footprints">👣</span></div><div class="intercom-emoji-picker-group"><div class="intercom-emoji-picker-group-title">Nature</div><span class="intercom-emoji-picker-emoji" title="dog">🐶</span><span class="intercom-emoji-picker-emoji" title="wolf">🐺</span><span class="intercom-emoji-picker-emoji" title="cat">🐱</span><span class="intercom-emoji-picker-emoji" title="mouse">🐭</span><span class="intercom-emoji-picker-emoji" title="hamster">🐹</span><span class="intercom-emoji-picker-emoji" title="rabbit">🐰</span><span class="intercom-emoji-picker-emoji" title="frog">🐸</span><span class="intercom-emoji-picker-emoji" title="tiger">🐯</span><span class="intercom-emoji-picker-emoji" title="koala">🐨</span><span class="intercom-emoji-picker-emoji" title="bear">🐻</span><span class="intercom-emoji-picker-emoji" title="pig">🐷</span><span class="intercom-emoji-picker-emoji" title="pig_nose">🐽</span><span class="intercom-emoji-picker-emoji" title="cow">🐮</span><span class="intercom-emoji-picker-emoji" title="boar">🐗</span><span class="intercom-emoji-picker-emoji" title="monkey_face">🐵</span><span class="intercom-emoji-picker-emoji" title="monkey">🐒</span><span class="intercom-emoji-picker-emoji" title="horse">🐴</span><span class="intercom-emoji-picker-emoji" title="sheep">🐑</span><span class="intercom-emoji-picker-emoji" title="elephant">🐘</span><span class="intercom-emoji-picker-emoji" title="panda_face">🐼</span><span class="intercom-emoji-picker-emoji" title="penguin">🐧</span><span class="intercom-emoji-picker-emoji" title="bird">🐦</span><span class="intercom-emoji-picker-emoji" title="baby_chick">🐤</span><span class="intercom-emoji-picker-emoji" title="hatched_chick">🐥</span><span class="intercom-emoji-picker-emoji" title="hatching_chick">🐣</span><span class="intercom-emoji-picker-emoji" title="chicken">🐔</span><span class="intercom-emoji-picker-emoji" title="snake">🐍</span><span class="intercom-emoji-picker-emoji" title="turtle">🐢</span><span class="intercom-emoji-picker-emoji" title="bug">🐛</span><span class="intercom-emoji-picker-emoji" title="bee">🐝</span><span class="intercom-emoji-picker-emoji" title="ant">🐜</span><span class="intercom-emoji-picker-emoji" title="beetle">🐞</span><span class="intercom-emoji-picker-emoji" title="snail">🐌</span><span class="intercom-emoji-picker-emoji" title="octopus">🐙</span><span class="intercom-emoji-picker-emoji" title="shell">🐚</span><span class="intercom-emoji-picker-emoji" title="tropical_fish">🐠</span><span class="intercom-emoji-picker-emoji" title="fish">🐟</span><span class="intercom-emoji-picker-emoji" title="dolphin">🐬</span><span class="intercom-emoji-picker-emoji" title="whale">🐳</span><span class="intercom-emoji-picker-emoji" title="racehorse">🐎</span><span class="intercom-emoji-picker-emoji" title="dragon_face">🐲</span><span class="intercom-emoji-picker-emoji" title="blowfish">🐡</span><span class="intercom-emoji-picker-emoji" title="camel">🐫</span><span class="intercom-emoji-picker-emoji" title="poodle">🐩</span><span class="intercom-emoji-picker-emoji" title="feet">🐾</span><span class="intercom-emoji-picker-emoji" title="bouquet">💐</span><span class="intercom-emoji-picker-emoji" title="cherry_blossom">🌸</span><span class="intercom-emoji-picker-emoji" title="tulip">🌷</span><span class="intercom-emoji-picker-emoji" title="four_leaf_clover">🍀</span><span class="intercom-emoji-picker-emoji" title="rose">🌹</span><span class="intercom-emoji-picker-emoji" title="sunflower">🌻</span><span class="intercom-emoji-picker-emoji" title="hibiscus">🌺</span><span class="intercom-emoji-picker-emoji" title="maple_leaf">🍁</span><span class="intercom-emoji-picker-emoji" title="leaves">🍃</span><span class="intercom-emoji-picker-emoji" title="fallen_leaf">🍂</span><span class="intercom-emoji-picker-emoji" title="herb">🌿</span><span class="intercom-emoji-picker-emoji" title="ear_of_rice">🌾</span><span class="intercom-emoji-picker-emoji" title="mushroom">🍄</span><span class="intercom-emoji-picker-emoji" title="cactus">🌵</span><span class="intercom-emoji-picker-emoji" title="palm_tree">🌴</span><span class="intercom-emoji-picker-emoji" title="chestnut">🌰</span><span class="intercom-emoji-picker-emoji" title="seedling">🌱</span><span class="intercom-emoji-picker-emoji" title="blossom">🌼</span><span class="intercom-emoji-picker-emoji" title="new_moon">🌑</span><span class="intercom-emoji-picker-emoji" title="first_quarter_moon">🌓</span><span class="intercom-emoji-picker-emoji" title="moon">🌔</span><span class="intercom-emoji-picker-emoji" title="full_moon">🌕</span><span class="intercom-emoji-picker-emoji" title="first_quarter_moon_with_face">🌛</span><span class="intercom-emoji-picker-emoji" title="crescent_moon">🌙</span><span class="intercom-emoji-picker-emoji" title="earth_asia">🌏</span><span class="intercom-emoji-picker-emoji" title="volcano">🌋</span><span class="intercom-emoji-picker-emoji" title="milky_way">🌌</span><span class="intercom-emoji-picker-emoji" title="stars">🌠</span><span class="intercom-emoji-picker-emoji" title="partly_sunny">⛅</span><span class="intercom-emoji-picker-emoji" title="snowman">⛄</span><span class="intercom-emoji-picker-emoji" title="cyclone">🌀</span><span class="intercom-emoji-picker-emoji" title="foggy">🌁</span><span class="intercom-emoji-picker-emoji" title="rainbow">🌈</span><span class="intercom-emoji-picker-emoji" title="ocean">🌊</span></div><div class="intercom-emoji-picker-group"><div class="intercom-emoji-picker-group-title">Objects</div><span class="intercom-emoji-picker-emoji" title="bamboo">🎍</span><span class="intercom-emoji-picker-emoji" title="gift_heart">💝</span><span class="intercom-emoji-picker-emoji" title="dolls">🎎</span><span class="intercom-emoji-picker-emoji" title="school_satchel">🎒</span><span class="intercom-emoji-picker-emoji" title="mortar_board">🎓</span><span class="intercom-emoji-picker-emoji" title="flags">🎏</span><span class="intercom-emoji-picker-emoji" title="fireworks">🎆</span><span class="intercom-emoji-picker-emoji" title="sparkler">🎇</span><span class="intercom-emoji-picker-emoji" title="wind_chime">🎐</span><span class="intercom-emoji-picker-emoji" title="rice_scene">🎑</span><span class="intercom-emoji-picker-emoji" title="jack_o_lantern">🎃</span><span class="intercom-emoji-picker-emoji" title="ghost">👻</span><span class="intercom-emoji-picker-emoji" title="santa">🎅</span><span class="intercom-emoji-picker-emoji" title="christmas_tree">🎄</span><span class="intercom-emoji-picker-emoji" title="gift">🎁</span><span class="intercom-emoji-picker-emoji" title="tanabata_tree">🎋</span><span class="intercom-emoji-picker-emoji" title="tada">🎉</span><span class="intercom-emoji-picker-emoji" title="confetti_ball">🎊</span><span class="intercom-emoji-picker-emoji" title="balloon">🎈</span><span class="intercom-emoji-picker-emoji" title="crossed_flags">🎌</span><span class="intercom-emoji-picker-emoji" title="crystal_ball">🔮</span><span class="intercom-emoji-picker-emoji" title="movie_camera">🎥</span><span class="intercom-emoji-picker-emoji" title="camera">📷</span><span class="intercom-emoji-picker-emoji" title="video_camera">📹</span><span class="intercom-emoji-picker-emoji" title="vhs">📼</span><span class="intercom-emoji-picker-emoji" title="cd">💿</span><span class="intercom-emoji-picker-emoji" title="dvd">📀</span><span class="intercom-emoji-picker-emoji" title="minidisc">💽</span><span class="intercom-emoji-picker-emoji" title="floppy_disk">💾</span><span class="intercom-emoji-picker-emoji" title="computer">💻</span><span class="intercom-emoji-picker-emoji" title="iphone">📱</span><span class="intercom-emoji-picker-emoji" title="telephone_receiver">📞</span><span class="intercom-emoji-picker-emoji" title="pager">📟</span><span class="intercom-emoji-picker-emoji" title="fax">📠</span><span class="intercom-emoji-picker-emoji" title="satellite">📡</span><span class="intercom-emoji-picker-emoji" title="tv">📺</span><span class="intercom-emoji-picker-emoji" title="radio">📻</span><span class="intercom-emoji-picker-emoji" title="loud_sound">🔊</span><span class="intercom-emoji-picker-emoji" title="bell">🔔</span><span class="intercom-emoji-picker-emoji" title="loudspeaker">📢</span><span class="intercom-emoji-picker-emoji" title="mega">📣</span><span class="intercom-emoji-picker-emoji" title="hourglass_flowing_sand">⏳</span><span class="intercom-emoji-picker-emoji" title="hourglass">⌛</span><span class="intercom-emoji-picker-emoji" title="alarm_clock">⏰</span><span class="intercom-emoji-picker-emoji" title="watch">⌚</span><span class="intercom-emoji-picker-emoji" title="unlock">🔓</span><span class="intercom-emoji-picker-emoji" title="lock">🔒</span><span class="intercom-emoji-picker-emoji" title="lock_with_ink_pen">🔏</span><span class="intercom-emoji-picker-emoji" title="closed_lock_with_key">🔐</span><span class="intercom-emoji-picker-emoji" title="key">🔑</span><span class="intercom-emoji-picker-emoji" title="mag_right">🔎</span><span class="intercom-emoji-picker-emoji" title="bulb">💡</span><span class="intercom-emoji-picker-emoji" title="flashlight">🔦</span><span class="intercom-emoji-picker-emoji" title="electric_plug">🔌</span><span class="intercom-emoji-picker-emoji" title="battery">🔋</span><span class="intercom-emoji-picker-emoji" title="mag">🔍</span><span class="intercom-emoji-picker-emoji" title="bath">🛀</span><span class="intercom-emoji-picker-emoji" title="toilet">🚽</span><span class="intercom-emoji-picker-emoji" title="wrench">🔧</span><span class="intercom-emoji-picker-emoji" title="nut_and_bolt">🔩</span><span class="intercom-emoji-picker-emoji" title="hammer">🔨</span><span class="intercom-emoji-picker-emoji" title="door">🚪</span><span class="intercom-emoji-picker-emoji" title="smoking">🚬</span><span class="intercom-emoji-picker-emoji" title="bomb">💣</span><span class="intercom-emoji-picker-emoji" title="gun">🔫</span><span class="intercom-emoji-picker-emoji" title="hocho">🔪</span><span class="intercom-emoji-picker-emoji" title="pill">💊</span><span class="intercom-emoji-picker-emoji" title="syringe">💉</span><span class="intercom-emoji-picker-emoji" title="moneybag">💰</span><span class="intercom-emoji-picker-emoji" title="yen">💴</span><span class="intercom-emoji-picker-emoji" title="dollar">💵</span><span class="intercom-emoji-picker-emoji" title="credit_card">💳</span><span class="intercom-emoji-picker-emoji" title="money_with_wings">💸</span><span class="intercom-emoji-picker-emoji" title="calling">📲</span><span class="intercom-emoji-picker-emoji" title="e-mail">📧</span><span class="intercom-emoji-picker-emoji" title="inbox_tray">📥</span><span class="intercom-emoji-picker-emoji" title="outbox_tray">📤</span><span class="intercom-emoji-picker-emoji" title="envelope_with_arrow">📩</span><span class="intercom-emoji-picker-emoji" title="incoming_envelope">📨</span><span class="intercom-emoji-picker-emoji" title="mailbox">📫</span><span class="intercom-emoji-picker-emoji" title="mailbox_closed">📪</span><span class="intercom-emoji-picker-emoji" title="postbox">📮</span><span class="intercom-emoji-picker-emoji" title="package">📦</span><span class="intercom-emoji-picker-emoji" title="memo">📝</span><span class="intercom-emoji-picker-emoji" title="page_facing_up">📄</span><span class="intercom-emoji-picker-emoji" title="page_with_curl">📃</span><span class="intercom-emoji-picker-emoji" title="bookmark_tabs">📑</span><span class="intercom-emoji-picker-emoji" title="bar_chart">📊</span><span class="intercom-emoji-picker-emoji" title="chart_with_upwards_trend">📈</span><span class="intercom-emoji-picker-emoji" title="chart_with_downwards_trend">📉</span><span class="intercom-emoji-picker-emoji" title="scroll">📜</span><span class="intercom-emoji-picker-emoji" title="clipboard">📋</span><span class="intercom-emoji-picker-emoji" title="date">📅</span><span class="intercom-emoji-picker-emoji" title="calendar">📆</span><span class="intercom-emoji-picker-emoji" title="card_index">📇</span><span class="intercom-emoji-picker-emoji" title="file_folder">📁</span><span class="intercom-emoji-picker-emoji" title="open_file_folder">📂</span><span class="intercom-emoji-picker-emoji" title="pushpin">📌</span><span class="intercom-emoji-picker-emoji" title="paperclip">📎</span><span class="intercom-emoji-picker-emoji" title="straight_ruler">📏</span><span class="intercom-emoji-picker-emoji" title="triangular_ruler">📐</span><span class="intercom-emoji-picker-emoji" title="closed_book">📕</span><span class="intercom-emoji-picker-emoji" title="green_book">📗</span><span class="intercom-emoji-picker-emoji" title="blue_book">📘</span><span class="intercom-emoji-picker-emoji" title="orange_book">📙</span><span class="intercom-emoji-picker-emoji" title="notebook">📓</span><span class="intercom-emoji-picker-emoji" title="notebook_with_decorative_cover">📔</span><span class="intercom-emoji-picker-emoji" title="ledger">📒</span><span class="intercom-emoji-picker-emoji" title="books">📚</span><span class="intercom-emoji-picker-emoji" title="book">📖</span><span class="intercom-emoji-picker-emoji" title="bookmark">🔖</span><span class="intercom-emoji-picker-emoji" title="name_badge">📛</span><span class="intercom-emoji-picker-emoji" title="newspaper">📰</span><span class="intercom-emoji-picker-emoji" title="art">🎨</span><span class="intercom-emoji-picker-emoji" title="clapper">🎬</span><span class="intercom-emoji-picker-emoji" title="microphone">🎤</span><span class="intercom-emoji-picker-emoji" title="headphones">🎧</span><span class="intercom-emoji-picker-emoji" title="musical_score">🎼</span><span class="intercom-emoji-picker-emoji" title="musical_note">🎵</span><span class="intercom-emoji-picker-emoji" title="notes">🎶</span><span class="intercom-emoji-picker-emoji" title="musical_keyboard">🎹</span><span class="intercom-emoji-picker-emoji" title="violin">🎻</span><span class="intercom-emoji-picker-emoji" title="trumpet">🎺</span><span class="intercom-emoji-picker-emoji" title="saxophone">🎷</span><span class="intercom-emoji-picker-emoji" title="guitar">🎸</span><span class="intercom-emoji-picker-emoji" title="space_invader">👾</span><span class="intercom-emoji-picker-emoji" title="video_game">🎮</span><span class="intercom-emoji-picker-emoji" title="black_joker">🃏</span><span class="intercom-emoji-picker-emoji" title="flower_playing_cards">🎴</span><span class="intercom-emoji-picker-emoji" title="mahjong">🀄</span><span class="intercom-emoji-picker-emoji" title="game_die">🎲</span><span class="intercom-emoji-picker-emoji" title="dart">🎯</span><span class="intercom-emoji-picker-emoji" title="football">🏈</span><span class="intercom-emoji-picker-emoji" title="basketball">🏀</span><span class="intercom-emoji-picker-emoji" title="soccer">⚽</span><span class="intercom-emoji-picker-emoji" title="baseball">⚾</span><span class="intercom-emoji-picker-emoji" title="tennis">🎾</span><span class="intercom-emoji-picker-emoji" title="8ball">🎱</span><span class="intercom-emoji-picker-emoji" title="bowling">🎳</span><span class="intercom-emoji-picker-emoji" title="golf">⛳</span><span class="intercom-emoji-picker-emoji" title="checkered_flag">🏁</span><span class="intercom-emoji-picker-emoji" title="trophy">🏆</span><span class="intercom-emoji-picker-emoji" title="ski">🎿</span><span class="intercom-emoji-picker-emoji" title="snowboarder">🏂</span><span class="intercom-emoji-picker-emoji" title="swimmer">🏊</span><span class="intercom-emoji-picker-emoji" title="surfer">🏄</span><span class="intercom-emoji-picker-emoji" title="fishing_pole_and_fish">🎣</span><span class="intercom-emoji-picker-emoji" title="tea">🍵</span><span class="intercom-emoji-picker-emoji" title="sake">🍶</span><span class="intercom-emoji-picker-emoji" title="beer">🍺</span><span class="intercom-emoji-picker-emoji" title="beers">🍻</span><span class="intercom-emoji-picker-emoji" title="cocktail">🍸</span><span class="intercom-emoji-picker-emoji" title="tropical_drink">🍹</span><span class="intercom-emoji-picker-emoji" title="wine_glass">🍷</span><span class="intercom-emoji-picker-emoji" title="fork_and_knife">🍴</span><span class="intercom-emoji-picker-emoji" title="pizza">🍕</span><span class="intercom-emoji-picker-emoji" title="hamburger">🍔</span><span class="intercom-emoji-picker-emoji" title="fries">🍟</span><span class="intercom-emoji-picker-emoji" title="poultry_leg">🍗</span><span class="intercom-emoji-picker-emoji" title="meat_on_bone">🍖</span><span class="intercom-emoji-picker-emoji" title="spaghetti">🍝</span><span class="intercom-emoji-picker-emoji" title="curry">🍛</span><span class="intercom-emoji-picker-emoji" title="fried_shrimp">🍤</span><span class="intercom-emoji-picker-emoji" title="bento">🍱</span><span class="intercom-emoji-picker-emoji" title="sushi">🍣</span><span class="intercom-emoji-picker-emoji" title="fish_cake">🍥</span><span class="intercom-emoji-picker-emoji" title="rice_ball">🍙</span><span class="intercom-emoji-picker-emoji" title="rice_cracker">🍘</span><span class="intercom-emoji-picker-emoji" title="rice">🍚</span><span class="intercom-emoji-picker-emoji" title="ramen">🍜</span><span class="intercom-emoji-picker-emoji" title="stew">🍲</span><span class="intercom-emoji-picker-emoji" title="oden">🍢</span><span class="intercom-emoji-picker-emoji" title="dango">🍡</span><span class="intercom-emoji-picker-emoji" title="egg">🍳</span><span class="intercom-emoji-picker-emoji" title="bread">🍞</span><span class="intercom-emoji-picker-emoji" title="doughnut">🍩</span><span class="intercom-emoji-picker-emoji" title="custard">🍮</span><span class="intercom-emoji-picker-emoji" title="icecream">🍦</span><span class="intercom-emoji-picker-emoji" title="ice_cream">🍨</span><span class="intercom-emoji-picker-emoji" title="shaved_ice">🍧</span><span class="intercom-emoji-picker-emoji" title="birthday">🎂</span><span class="intercom-emoji-picker-emoji" title="cake">🍰</span><span class="intercom-emoji-picker-emoji" title="cookie">🍪</span><span class="intercom-emoji-picker-emoji" title="chocolate_bar">🍫</span><span class="intercom-emoji-picker-emoji" title="candy">🍬</span><span class="intercom-emoji-picker-emoji" title="lollipop">🍭</span><span class="intercom-emoji-picker-emoji" title="honey_pot">🍯</span><span class="intercom-emoji-picker-emoji" title="apple">🍎</span><span class="intercom-emoji-picker-emoji" title="green_apple">🍏</span><span class="intercom-emoji-picker-emoji" title="tangerine">🍊</span><span class="intercom-emoji-picker-emoji" title="cherries">🍒</span><span class="intercom-emoji-picker-emoji" title="grapes">🍇</span><span class="intercom-emoji-picker-emoji" title="watermelon">🍉</span><span class="intercom-emoji-picker-emoji" title="strawberry">🍓</span><span class="intercom-emoji-picker-emoji" title="peach">🍑</span><span class="intercom-emoji-picker-emoji" title="melon">🍈</span><span class="intercom-emoji-picker-emoji" title="banana">🍌</span><span class="intercom-emoji-picker-emoji" title="pineapple">🍍</span><span class="intercom-emoji-picker-emoji" title="sweet_potato">🍠</span><span class="intercom-emoji-picker-emoji" title="eggplant">🍆</span><span class="intercom-emoji-picker-emoji" title="tomato">🍅</span><span class="intercom-emoji-picker-emoji" title="corn">🌽</span></div><div class="intercom-emoji-picker-group"><div class="intercom-emoji-picker-group-title">Places</div><span class="intercom-emoji-picker-emoji" title="house">🏠</span><span class="intercom-emoji-picker-emoji" title="house_with_garden">🏡</span><span class="intercom-emoji-picker-emoji" title="school">🏫</span><span class="intercom-emoji-picker-emoji" title="office">🏢</span><span class="intercom-emoji-picker-emoji" title="post_office">🏣</span><span class="intercom-emoji-picker-emoji" title="hospital">🏥</span><span class="intercom-emoji-picker-emoji" title="bank">🏦</span><span class="intercom-emoji-picker-emoji" title="convenience_store">🏪</span><span class="intercom-emoji-picker-emoji" title="love_hotel">🏩</span><span class="intercom-emoji-picker-emoji" title="hotel">🏨</span><span class="intercom-emoji-picker-emoji" title="wedding">💒</span><span class="intercom-emoji-picker-emoji" title="church">⛪</span><span class="intercom-emoji-picker-emoji" title="department_store">🏬</span><span class="intercom-emoji-picker-emoji" title="city_sunrise">🌇</span><span class="intercom-emoji-picker-emoji" title="city_sunset">🌆</span><span class="intercom-emoji-picker-emoji" title="japanese_castle">🏯</span><span class="intercom-emoji-picker-emoji" title="european_castle">🏰</span><span class="intercom-emoji-picker-emoji" title="tent">⛺</span><span class="intercom-emoji-picker-emoji" title="factory">🏭</span><span class="intercom-emoji-picker-emoji" title="tokyo_tower">🗼</span><span class="intercom-emoji-picker-emoji" title="japan">🗾</span><span class="intercom-emoji-picker-emoji" title="mount_fuji">🗻</span><span class="intercom-emoji-picker-emoji" title="sunrise_over_mountains">🌄</span><span class="intercom-emoji-picker-emoji" title="sunrise">🌅</span><span class="intercom-emoji-picker-emoji" title="night_with_stars">🌃</span><span class="intercom-emoji-picker-emoji" title="statue_of_liberty">🗽</span><span class="intercom-emoji-picker-emoji" title="bridge_at_night">🌉</span><span class="intercom-emoji-picker-emoji" title="carousel_horse">🎠</span><span class="intercom-emoji-picker-emoji" title="ferris_wheel">🎡</span><span class="intercom-emoji-picker-emoji" title="fountain">⛲</span><span class="intercom-emoji-picker-emoji" title="roller_coaster">🎢</span><span class="intercom-emoji-picker-emoji" title="ship">🚢</span><span class="intercom-emoji-picker-emoji" title="boat">⛵</span><span class="intercom-emoji-picker-emoji" title="speedboat">🚤</span><span class="intercom-emoji-picker-emoji" title="rocket">🚀</span><span class="intercom-emoji-picker-emoji" title="seat">💺</span><span class="intercom-emoji-picker-emoji" title="station">🚉</span><span class="intercom-emoji-picker-emoji" title="bullettrain_side">🚄</span><span class="intercom-emoji-picker-emoji" title="bullettrain_front">🚅</span><span class="intercom-emoji-picker-emoji" title="metro">🚇</span><span class="intercom-emoji-picker-emoji" title="railway_car">🚃</span><span class="intercom-emoji-picker-emoji" title="bus">🚌</span><span class="intercom-emoji-picker-emoji" title="blue_car">🚙</span><span class="intercom-emoji-picker-emoji" title="car">🚗</span><span class="intercom-emoji-picker-emoji" title="taxi">🚕</span><span class="intercom-emoji-picker-emoji" title="truck">🚚</span><span class="intercom-emoji-picker-emoji" title="rotating_light">🚨</span><span class="intercom-emoji-picker-emoji" title="police_car">🚓</span><span class="intercom-emoji-picker-emoji" title="fire_engine">🚒</span><span class="intercom-emoji-picker-emoji" title="ambulance">🚑</span><span class="intercom-emoji-picker-emoji" title="bike">🚲</span><span class="intercom-emoji-picker-emoji" title="barber">💈</span><span class="intercom-emoji-picker-emoji" title="busstop">🚏</span><span class="intercom-emoji-picker-emoji" title="ticket">🎫</span><span class="intercom-emoji-picker-emoji" title="traffic_light">🚥</span><span class="intercom-emoji-picker-emoji" title="construction">🚧</span><span class="intercom-emoji-picker-emoji" title="beginner">🔰</span><span class="intercom-emoji-picker-emoji" title="fuelpump">⛽</span><span class="intercom-emoji-picker-emoji" title="izakaya_lantern">🏮</span><span class="intercom-emoji-picker-emoji" title="slot_machine">🎰</span><span class="intercom-emoji-picker-emoji" title="moyai">🗿</span><span class="intercom-emoji-picker-emoji" title="circus_tent">🎪</span><span class="intercom-emoji-picker-emoji" title="performing_arts">🎭</span><span class="intercom-emoji-picker-emoji" title="round_pushpin">📍</span><span class="intercom-emoji-picker-emoji" title="triangular_flag_on_post">🚩</span></div><div class="intercom-emoji-picker-group"><div class="intercom-emoji-picker-group-title">Symbols</div><span class="intercom-emoji-picker-emoji" title="keycap_ten">🔟</span><span class="intercom-emoji-picker-emoji" title="1234">🔢</span><span class="intercom-emoji-picker-emoji" title="symbols">🔣</span><span class="intercom-emoji-picker-emoji" title="capital_abcd">🔠</span><span class="intercom-emoji-picker-emoji" title="abcd">🔡</span><span class="intercom-emoji-picker-emoji" title="abc">🔤</span><span class="intercom-emoji-picker-emoji" title="arrow_up_small">🔼</span><span class="intercom-emoji-picker-emoji" title="arrow_down_small">🔽</span><span class="intercom-emoji-picker-emoji" title="rewind">⏪</span><span class="intercom-emoji-picker-emoji" title="fast_forward">⏩</span><span class="intercom-emoji-picker-emoji" title="arrow_double_up">⏫</span><span class="intercom-emoji-picker-emoji" title="arrow_double_down">⏬</span><span class="intercom-emoji-picker-emoji" title="ok">🆗</span><span class="intercom-emoji-picker-emoji" title="new">🆕</span><span class="intercom-emoji-picker-emoji" title="up">🆙</span><span class="intercom-emoji-picker-emoji" title="cool">🆒</span><span class="intercom-emoji-picker-emoji" title="free">🆓</span><span class="intercom-emoji-picker-emoji" title="ng">🆖</span><span class="intercom-emoji-picker-emoji" title="signal_strength">📶</span><span class="intercom-emoji-picker-emoji" title="cinema">🎦</span><span class="intercom-emoji-picker-emoji" title="koko">🈁</span><span class="intercom-emoji-picker-emoji" title="u6307">🈯</span><span class="intercom-emoji-picker-emoji" title="u7a7a">🈳</span><span class="intercom-emoji-picker-emoji" title="u6e80">🈵</span><span class="intercom-emoji-picker-emoji" title="u5408">🈴</span><span class="intercom-emoji-picker-emoji" title="u7981">🈲</span><span class="intercom-emoji-picker-emoji" title="ideograph_advantage">🉐</span><span class="intercom-emoji-picker-emoji" title="u5272">🈹</span><span class="intercom-emoji-picker-emoji" title="u55b6">🈺</span><span class="intercom-emoji-picker-emoji" title="u6709">🈶</span><span class="intercom-emoji-picker-emoji" title="u7121">🈚</span><span class="intercom-emoji-picker-emoji" title="restroom">🚻</span><span class="intercom-emoji-picker-emoji" title="mens">🚹</span><span class="intercom-emoji-picker-emoji" title="womens">🚺</span><span class="intercom-emoji-picker-emoji" title="baby_symbol">🚼</span><span class="intercom-emoji-picker-emoji" title="wc">🚾</span><span class="intercom-emoji-picker-emoji" title="no_smoking">🚭</span><span class="intercom-emoji-picker-emoji" title="u7533">🈸</span><span class="intercom-emoji-picker-emoji" title="accept">🉑</span><span class="intercom-emoji-picker-emoji" title="cl">🆑</span><span class="intercom-emoji-picker-emoji" title="sos">🆘</span><span class="intercom-emoji-picker-emoji" title="id">🆔</span><span class="intercom-emoji-picker-emoji" title="no_entry_sign">🚫</span><span class="intercom-emoji-picker-emoji" title="underage">🔞</span><span class="intercom-emoji-picker-emoji" title="no_entry">⛔</span><span class="intercom-emoji-picker-emoji" title="negative_squared_cross_mark">❎</span><span class="intercom-emoji-picker-emoji" title="white_check_mark">✅</span><span class="intercom-emoji-picker-emoji" title="heart_decoration">💟</span><span class="intercom-emoji-picker-emoji" title="vs">🆚</span><span class="intercom-emoji-picker-emoji" title="vibration_mode">📳</span><span class="intercom-emoji-picker-emoji" title="mobile_phone_off">📴</span><span class="intercom-emoji-picker-emoji" title="ab">🆎</span><span class="intercom-emoji-picker-emoji" title="diamond_shape_with_a_dot_inside">💠</span><span class="intercom-emoji-picker-emoji" title="ophiuchus">⛎</span><span class="intercom-emoji-picker-emoji" title="six_pointed_star">🔯</span><span class="intercom-emoji-picker-emoji" title="atm">🏧</span><span class="intercom-emoji-picker-emoji" title="chart">💹</span><span class="intercom-emoji-picker-emoji" title="heavy_dollar_sign">💲</span><span class="intercom-emoji-picker-emoji" title="currency_exchange">💱</span><span class="intercom-emoji-picker-emoji" title="x">❌</span><span class="intercom-emoji-picker-emoji" title="exclamation">❗</span><span class="intercom-emoji-picker-emoji" title="question">❓</span><span class="intercom-emoji-picker-emoji" title="grey_exclamation">❕</span><span class="intercom-emoji-picker-emoji" title="grey_question">❔</span><span class="intercom-emoji-picker-emoji" title="o">⭕</span><span class="intercom-emoji-picker-emoji" title="top">🔝</span><span class="intercom-emoji-picker-emoji" title="end">🔚</span><span class="intercom-emoji-picker-emoji" title="back">🔙</span><span class="intercom-emoji-picker-emoji" title="on">🔛</span><span class="intercom-emoji-picker-emoji" title="soon">🔜</span><span class="intercom-emoji-picker-emoji" title="arrows_clockwise">🔃</span><span class="intercom-emoji-picker-emoji" title="clock12">🕛</span><span class="intercom-emoji-picker-emoji" title="clock1">🕐</span><span class="intercom-emoji-picker-emoji" title="clock2">🕑</span><span class="intercom-emoji-picker-emoji" title="clock3">🕒</span><span class="intercom-emoji-picker-emoji" title="clock4">🕓</span><span class="intercom-emoji-picker-emoji" title="clock5">🕔</span><span class="intercom-emoji-picker-emoji" title="clock6">🕕</span><span class="intercom-emoji-picker-emoji" title="clock7">🕖</span><span class="intercom-emoji-picker-emoji" title="clock8">🕗</span><span class="intercom-emoji-picker-emoji" title="clock9">🕘</span><span class="intercom-emoji-picker-emoji" title="clock10">🕙</span><span class="intercom-emoji-picker-emoji" title="clock11">🕚</span><span class="intercom-emoji-picker-emoji" title="heavy_plus_sign">➕</span><span class="intercom-emoji-picker-emoji" title="heavy_minus_sign">➖</span><span class="intercom-emoji-picker-emoji" title="heavy_division_sign">➗</span><span class="intercom-emoji-picker-emoji" title="white_flower">💮</span><span class="intercom-emoji-picker-emoji" title="100">💯</span><span class="intercom-emoji-picker-emoji" title="radio_button">🔘</span><span class="intercom-emoji-picker-emoji" title="link">🔗</span><span class="intercom-emoji-picker-emoji" title="curly_loop">➰</span><span class="intercom-emoji-picker-emoji" title="trident">🔱</span><span class="intercom-emoji-picker-emoji" title="small_red_triangle">🔺</span><span class="intercom-emoji-picker-emoji" title="black_square_button">🔲</span><span class="intercom-emoji-picker-emoji" title="white_square_button">🔳</span><span class="intercom-emoji-picker-emoji" title="red_circle">🔴</span><span class="intercom-emoji-picker-emoji" title="large_blue_circle">🔵</span><span class="intercom-emoji-picker-emoji" title="small_red_triangle_down">🔻</span><span class="intercom-emoji-picker-emoji" title="white_large_square">⬜</span><span class="intercom-emoji-picker-emoji" title="black_large_square">⬛</span><span class="intercom-emoji-picker-emoji" title="large_orange_diamond">🔶</span><span class="intercom-emoji-picker-emoji" title="large_blue_diamond">🔷</span><span class="intercom-emoji-picker-emoji" title="small_orange_diamond">🔸</span><span class="intercom-emoji-picker-emoji" title="small_blue_diamond">🔹</span></div></div></div></div></div><div class="intercom-composer-popover-caret"></div></div>');
});
