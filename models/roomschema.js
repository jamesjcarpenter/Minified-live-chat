const mongoose = require('mongoose');
const express = require('express')
const session = require('express-session')

const RoomSchema = new mongoose.Schema({
  members: [],
  lastActive: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now }
});
var Room = module.exports = mongoose.model('Room', RoomSchema);
