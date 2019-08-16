const mongoose = require('mongoose');
const express = require('express')
const session = require('express-session')

const RoomSchema = new mongoose.Schema({
  roomname: { type: String, unique: true },
  members: [],
  lastActive: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now }
});
var Room = module.exports = mongoose.model('Room', RoomSchema);


module.exports.getRoomByRoomName = function(roomname, callback){
  var query = {roomname: roomname};
  Room.findOne(query, callback);
}

module.exports.createRoom = function(newRoom, callback){
        // Store hash in your password DB.
        newRoom.save(callback);
}
