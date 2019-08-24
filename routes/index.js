var express = require('express');
var router = express.Router();
var path = require('path');
const session = require('express-session')
var csrf = require('csurf');
var bodyParser = require('body-parser');
var sanitize = require('mongo-sanitize');

var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

// var username = sanitize(req.user.name);
// var res.locals.query = sanitize(req.query);
// var res.locals.url = sanitize(req.originalUrl);
// var name = sanitize(req.params.name);
// var chat = sanitize(req.session.chat);

//add nonce
const crypto = require('crypto');
router.use(function(req, res, next) {
  let nonce = crypto.randomBytes(16).toString('base64');
});
//end nonce


router.get('*', function (req, res, next) {
  res.locals.login = req.isAuthenticated();
   console.log('ok');
   console.log(req.isAuthenticated());
  next()
 });


router.get('/', function(req, res) {
  res.render('home.handlebars', { nonce: req.nonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

// , { name: req.params.name, chat: req.session.chat, username: req.user }

router.get('/room', function(req, res) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
   res.locals.url   = req.originalUrl;
   res.render('index.ejs', { nonce: req.nonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/profile', function(req, res) {
      res.render('profile.handlebars');
});

router.get('/admin', function(req, res) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
   res.locals.url   = req.originalUrl;
   res.render('admin.ejs', { nonce: req.nonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/dashboard', function(req, res) {
      res.render('dashboard.handlebars', { nonce: req.nonce, name: req.params.name, chat: req.session.chat, username: req.user });
});

router.get('/home', function(req, res) {
      res.render('home.handlebars', { nonce: req.nonce, name: req.params.name, chat: req.session.chat, username: req.user });
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
