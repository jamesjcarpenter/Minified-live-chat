$(document).ready(function() {

    var socket = io.connect('https://www.anomic.io/443');

    var values = [];
    
    
    for (var i = 0; i < socket.rooms.length; i++)
    {
        var room = socket.rooms[i];
        if(values.indexOf(room[1] === -1) values.push(room[1]);
        
    };

      console.log(values);


    socket.on('connect', function(data) {
      $.each(data, function(key, value) {
  			$('#roomlist').append('' + '<span class="ui white text">' + key + '</span>' + '<span class="ui white text">' + '' + '</span>' + '<br>');
    });

});
