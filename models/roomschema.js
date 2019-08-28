const mongoose = require('mongoose');
const express = require('express')
const session = require('express-session')

const RoomSchema = new mongoose.Schema({
  name1: { type: String, default: "", },
   name2: { type: String, default: "",},
   members: [],
   lastActive: { type: Date, default: Date.now },
   createdOn: { type: Date, default: Date.now },
});
var Room = module.exports = mongoose.model('Room', RoomSchema);

// var room2 = new Room({ name1: 'real9k', name2: 'real9k', members: [], lastActive: '', createdOn: '8/27/2019' });

// room2.save(function (err, room) {
//      if (err) return console.error(err);
//      console.log(room.name + " saved to room collection.");
//    });

function saveRoom(data) {
    var newRoom = new Room(data);
    newRoom.save(function (err) {
        if (err) return handleError(err);
        // saved!
    })
}

router.post('/newroom', function(req, res, next) {
    
    //User is the model created in app.js of this project
    var newRoom = new Room({
      name1: req.body.name1,
      name2: req.body.name1,
      members: [],
      createdOn: today,
      updatedOn: today    
    });
    
    
    console.log(newRoom);
    // save the user
    newRoom.save(function(err) {
      if (err) throw err;
      console.log('Room created!');
      console.log(req.room);
      console.log(req.session.chat);
      
      res.redirect('/room' + '?name=' + '' + req.body.name1);
      res.render('index.ejs', { room: newRoom, chat: req.session.chat });
    });

});

//module.exports.getRoomByRoomName = function(roomname, callback){
//  var query = {roomname: roomname};
//  Room.findOne(query, callback);
//}

//module.exports.createRoom = function(newRoom, callback){
        // Store hash in your password DB.
  //      newRoom.save(callback);
//}
//
