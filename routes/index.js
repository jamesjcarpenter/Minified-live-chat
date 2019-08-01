var express = require('express');
var router = express.Router();
var path = require('path');

router.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  console.log('ok');
  console.log(req.isAuthenticated());
  next()
});

router.get('/', function(req, res) {
  res.render('index.ejs');
});
//get



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
