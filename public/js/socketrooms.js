var socket = io.connect('anomic.io/');
  // Add validation rules to Create/Join Room Form
  
  
  socket.on('connect', function(){
    
    var values = [];
    
    
    for (var i = 0; i < socket.rooms.length; i++)
    {
        var room = socket.rooms[i];
        if(values.indexOf(room[1] === -1) values.push(room[1]);
        
    };

      console.log(values);
      
    $.each(data, function(key, values) {
      $('#roomlist').append('' + '<span class="ui white text">' + key + '</span>' + '<span class="ui white text">' + '' + values + '</span>' + '<br>');
    
      
    socket.room = {};
    var roomId = url.substr(url.lastIndexOf("=")+1);
    socket.room = roomId;
    // console.log("roomId : "+roomId);
    //event to get chat history on button click or as room is set.
     socket.emit('join', roomId);

       socket.emit('adduser', prompt("Enter username."));

  // call the server-side function 'adduser' and send one parameter (value of prompt)
      //empty messages.
      socket.on('askForUserId', () => {
        socket.emit(socket.id);
  
      });
  });
