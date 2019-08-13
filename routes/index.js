var express = require('express');
var router = express.Router();
var path = require('path');

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

router.get('/room', function(req, res) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  res.locals.query = req.query;
   res.locals.url   = req.originalUrl;
   res.render('index.ejs', { name: req.params.name, chat: req.session.chat, username: req.user.name });
});

router.get('/profile', function(req, res) {
      res.render('profile.handlebars', { username: req.user });
});

router.get('/dashboard', function(req, res) {
      res.render('dashboard.handlebars', { username: req.user });
});

router.get('/home', function(req, res) {
      res.render('home.handlebars', { username: req.user });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err){
    res.redirect('/login')
    res.clearCookie(SESS_NAME)
    }
  })
})

module.exports = router;
