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
var url = require('url')

// var username = sanitize(req.user.name);
// var res.locals.query = sanitize(req.query);
// var res.locals.url = sanitize(req.originalUrl);
// var name = sanitize(req.params.name);
// var chat = sanitize(req.session.chat);

//add nonce

//end nonce

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields

router.get('*', function (req, res, next) {
  res.locals.login = req.user;
   console.log('ok');
   console.dir(req.ip)
   console.dir(req.ips)
  //  console.log(req.user)
   if(req.isAuthenticated()){
    console.log(req.user.name)
    }
   // console.dir(req.method)
   // console.dir(req.path)
   // console.dir(req.route)
  next()
 });



var options = {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: '1d',
  redirect: true,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
 
router.get('/', function(req, res, options) {
  res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});


router.get('/store', function(req, res, options) {
  // res.render('store.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
  res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/register', function(req, res, options) {
  res.render('register.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/pro', function(req, res, options) {
  res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});


router.get('/rooms', function(req, res, options) {
  //  res.render('rooms.ejs', { error: false, styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user});
  res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

// , { name: req.params.name, chat: req.session.chat, username: req.user }



router.get('/room/:name1', function(req, res, options) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
   res.locals.url   = req.originalUrl;
   res.render('index.ejs', { error: false, styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user});
});

router.get('/profile', function(req, res, options) {
      // res.render('profile.handlebars');
      res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});




router.get('/admin', function(req, res, options) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
   res.locals.url   = req.originalUrl;
  //  res.render('admin.ejs', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
  res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/dashboard', function(req, res, options) {
      // res.render('dashboard.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
      res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/home', function(req, res, options) {
      res.render('home.handlebars', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
});




router.use(function (req, res, next) {

    if (req.originalUrl === '/users/login') {
    return next();
  } if (req.originalUrl === '/home') {
    return next(); 
  } if (req.originalUrl === '/room') {
    return next(); 
  } if (req.originalUrl === '/users/register') {
    return next(); 
  } if (req.originalUrl === '/profile') {
    return next();  
  } if (req.originalUrl === '/logout') {
    return next();  
  } if (req.originalUrl === '/dashboard') {
    return next();  
  } if (req.originalUrl === '/room/*') {
    return next();
  } if (req.originalUrl === '/') {
    return next();
  } if (req.originalUrl === '/') {
    return next();
  } if (req.originalUrl === '/') {
    return next();
  } else {
      res.render('404.ejs', { styleNonce: res.locals.styleNonce, name: req.params.name, chat: req.session.chat, username: req.user });
  };
});

router.post('/logout', (req, res, options) => {
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
