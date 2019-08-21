const mongoose = require('mongoose');
const express = require('express')
const session = require('express-session')

const RoomSchema = new mongoose.Schema({
  name1: { type: String, default: "", },
   name2: { type: String, default: "",},
   members: [],
   lastActive: { type: Date, default: Date.now },
   createdOn: { type: Date, default: Date.now }
});
var Room = module.exports = mongoose.model('Room', RoomSchema);

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
