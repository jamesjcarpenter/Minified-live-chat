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



//module.exports.getRoomByRoomName = function(roomname, callback){
//  var query = {roomname: roomname};
//  Room.findOne(query, callback);
//}

//module.exports.createRoom = function(newRoom, callback){
        // Store hash in your password DB.
  //      newRoom.save(callback);
//}
//
