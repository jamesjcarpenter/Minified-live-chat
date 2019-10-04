const mongoose = require("mongoose");
const express = require('express')
const session = require('express-session')

const ConnectSchema = new mongoose.Schema({
  socketId: { type: String, default: ""},
  client: { type: String, default: ""}
});

var Connect = module.exports = mongoose.model('Connect', ConnectSchema);
