const mongoose = require("mongoose");
const express = require('express')
const router = express.Router();
const session = require('express-session')

const ChatSchema = new mongoose.Schema({
  msgFrom: { type: String, default: "", required: true },
  msgTo: { type: String, default: "", required: true },
  msg: { type: String, default: "", required: true },
  room: { type: String, default: "", required: true },
  createdOn: { type: Date, default: Date.now }
});

var Chat = module.exports = mongoose.model('Chat', ChatSchema);

module.exports = router;
