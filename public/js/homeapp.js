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
      return url.substr(url.lastIndexOf("/")+1);
  }
  console.log(url.substr(url.lastIndexOf("/")+1));
  
  $('#copyinput').val($('#copyinput').val() + '' + window.location.href);
  $("#data").focus();
  
  $('.input-group-addon').remove();
  
  $('#youtubeopen').click( function() {
    $('.ui.longer.modal').modal('show');
  });
  
  
  $('.ytp-cued-thumbnail-overlay-image').hide();
  var roomDesc = null;
        // $('#logo').append($('<img src="images/robotsleep.png" />').text());
  
  
      // document.getElementById('themecss').href = 'css/indextheme2.css';
      // $('.ui.button').addClass('inverted');
      // $('.icon').addClass('inverted');
      // $('.ui.medium.left.pointing.label').addClass('inverted');
      // $('.large.ui.teal.secondary.button.inverted').removeClass('large ui teal').addClass('large ui black');
      // $('#cpybutton').removeClass('ui teal').addClass('ui black');
      // 
      
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
  
  $(document).ready(function() {
      $(".arrow-right").bind("click", function(event) {
          event.preventDefault();
          $(".vid-list-container").stop().animate({
              scrollLeft: "+=336"
          }, 750);
      });
      $(".arrow-left").bind("click", function(event) {
          event.preventDefault();
          $(".vid-list-container").stop().animate({
              scrollLeft: "-=336"
          }, 750);
      });
  });
  
  var date = JSON.stringify(new Date(Date.now()).toLocaleTimeString())
    // toggle sidebar
  var socket = io.connect('anomic.io/');
    // Add validation rules to Create/Join Room Form
    socket.on('connect', function(){
      
      var roomId = url.substr(url.lastIndexOf("/")+1);
      socket.room = roomId;
      // console.log("roomId : "+roomId);
      //event to get chat history on button click or as room is set.
       socket.emit('join', roomId);
      

       socket.on('updatehomepage', function(rooms, roomDesc) {
        $('#goa').empty();
        $.each(rooms, function(key, value, roomDesc) {
            if (value !== 'home'){
            $('#goa').append('<div class="five wide column"><a href="/room/'
             + value + '">' + '<div class="ui segment"id="rightlabelroom"><h3>' 
             + value + '</h3>' + '<p id="desc">' + roomDesc + '</p>'  + '</div></div></a>' 
             + '<div class="ui basic segment"id="seg"></div>');
            console.log(value.substr(value.lastIndexOf("/")+1));
            }
            // $('#roomlist').append('<div><a href="#" id="linkroom">' + value + '</a></div>');
        });
      });
         // socket.emit('adduser', prompt("Enter username."));
  
    // call the server-side function 'adduser' and send one parameter (value of prompt)
        //empty messages.
        socket.on('askForUserId', () => {
          socket.emit(socket.id);
        });
        
        $('#submitroom').click( function() {
        window.location = 'https://anomic.io/room/' + $('#urlname').val();
        socket.emit('admin', socket.id);
        });
      });
    
    
    
  
    socket.on('updateusers', function(data) {
      
          $('#userlist').empty();
      // $('#userlist').append('<div class="list-group-item-heading"><span class="ui white text">' + 'online' + '<br>' + 'room &nbsp;#' + '' + socket.room + '</span></div><br><br>');
          $.each(data, function(key, value) {
              $('#userlist').append('<a class="ui black circular image label"id="imagelabel"><img src="/images/avatarsmall.jpg">' + '<span class="ui white text">' + key  + '</span>' + '</a>' + '<br>');
          });     
       });
        
        
        
    
    

    
    function replaceUrl() {
      
      $(".ui.left.pointing.label").each(function(){
          $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ') );
        });
        
      };
  
        
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
    

    
    socket.on('updateactive', function(numClients) {
      $('#globallist').empty();
      // $('#userlist').append('<div class="list-group-item-heading"><span class="ui white text">' + 'online' + '<br>' + 'room &nbsp;#' + '' + socket.room + '</span></div><br><br>');
      // $.each(data, function(key, value) {
        // $('#globallist').append('' + numClients);
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
  
  });
  