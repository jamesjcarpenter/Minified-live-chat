var express = require('express');
var router = express.Router();
var path = require('path');
const Chat = require("../models/chat");
const User = require("../models/user");
const Room = require("../models/roomschema");
const Image = require("../models/profileimg");

router.all('*', function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  console.log('ok');
  console.log(req.isAuthenticated());
  next()
});


router.get('/', function(req, res) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
  res.locals.url   = req.originalUrl;
  res.render('home.handlebars', { name: req.params.name, chat: req.session.chat, username: req.user });
});
//get

// , { name: req.params.name, chat: req.session.chat, username: req.user }

router.get('/room', function(req, res) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
  newRoom = new Room({
    name1: room.name1,
    name2: room.name2,
    lastActive: today,
    createdOn: today
  });
  var newChat = new Chat({
    msgFrom: data.msgFrom,
    msgTo: data.msgTo,
    msg: data.msg,
    room: data.room,
    createdOn: data.date
  });
   res.locals.url   = req.originalUrl;
   res.render('index.ejs', { name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/profile', function(req, res) {
      res.render('profile.handlebars');
});

router.get('/admin', function(req, res) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
   res.locals.url   = req.originalUrl;
   res.render('admin.ejs', { name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/dashboard', function(req, res) {
      res.render('dashboard.handlebars', { name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/home', function(req, res) {
      res.render('home.handlebars', { name: req.params.name, chat: req.session.chat, username: req.user });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err){
    res.redirect('/login')
    res.clearCookie(SESS_NAME)
    }
  })
})

//const Janus = require('../src/Janus')
//const JanusAdmin = require('../src/JanusAdmin')
//const JanusPlugin = require('../src/JanusPlugin')
//const EchoJanusPlugin = require('../src/plugin/EchoJanusPlugin')
//const RecordPlayJanusPlugin = require('../src/plugin/RecordPlayJanusPlugin')
//const VideoRoomListenerJanusPlugin = require('../src/plugin/VideoRoomListenerJanusPlugin')
//const VideoRoomPublisherJanusPlugin = require('../src/plugin/VideoRoomPublisherJanusPlugin')
//const StreamingJanusPlugin = require('../src/plugin/StreamingJanusPlugin')
//const { JanusConfig, JanusAdminConfig, JanusRoomConfig } = require('../src/Config')

//module.exports = {
//  Janus,
//  JanusAdmin,
//  JanusPlugin,
//  EchoJanusPlugin,
//  RecordPlayJanusPlugin,
//  VideoRoomListenerJanusPlugin,
//  VideoRoomPublisherJanusPlugin,
//  StreamingJanusPlugin,
//  JanusConfig,
//  JanusAdminConfig,
//  JanusRoomConfig
//}


module.exports = router;
