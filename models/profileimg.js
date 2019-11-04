const mongoose = require('mongoose');
const express = require('express')
const session = require('express-session')

const ImageSchema = new mongoose.Schema({
  image: {
  data: Buffer,
  contentType: String
  }
});
var Image = module.exports = mongoose.model('Image', ImageSchema);
