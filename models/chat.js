const mongoose = require("mongoose");
const express = require('express')
const session = require('express-session')

const ChatSchema = new mongoose.Schema({
  msgFrom: { type: String, default: ""},
  msgTo: { type: String, default: "" },
  msg: { type: String, default: "", required: true },
  room: { type: String, default: "", required: true },
  createdOn: { type: Date, default: Date.now }
});

var Chat = module.exports = mongoose.model('Chat', ChatSchema);
