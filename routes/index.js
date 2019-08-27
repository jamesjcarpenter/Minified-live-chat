var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var path = require('path');
const session = require('express-session')
var csrf = require('csurf');
var bodyParser = require('body-parser');
var sanitize = require('mongo-sanitize');
const shortid = require("shortid");
const today = Date.now();
const id = shortid.generate();

var rooms = require("../models/roomschema");
var room = require("../models/roomschema");

const Room = require("../models/roomschema");
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

// var username = sanitize(req.user.name);
// var res.locals.query = sanitize(req.query);
// var res.locals.url = sanitize(req.originalUrl);
// var name = sanitize(req.params.name);
// var chat = sanitize(req.session.chat);

//add nonce

//end nonce

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields

router.get('*', function (req, res, next) {
  res.locals.login = req.isAuthenticated();
   console.log('ok');
   console.log(req.isAuthenticated());
  next()
 });


router.get('/', function(req, res) {
  res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

// , { name: req.params.name, chat: req.session.chat, username: req.user }

router.get('/room', function(req, res) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
   res.locals.url   = req.originalUrl;
   res.render('index.ejs', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user});
});

router.get('/profile', function(req, res) {
      res.render('profile.handlebars');
});

router.get('/admin', function(req, res) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
   res.locals.url   = req.originalUrl;
   res.render('admin.ejs', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/dashboard', function(req, res) {
      res.render('dashboard.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/home', function(req, res) {
      res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

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
      res.redirect('/room?name=' + '' + req.body.name1);
      res.render('index.ejs', { room: req.body.name1 });
    });

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
