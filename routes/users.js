const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// Load User model
const User = require('../models/user');
var sessionStorage = require('sessionstorage');

const shortid = require("shortid");
const today = Date.now();
const id = shortid.generate();

router.get('/login', function(req, res) {
      res.render('login.handlebars', { username: req.user });
});

router.get('/register', function(req, res) {
      res.render('register.handlebars');
});

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        res.redirect('/login');
      } else {
        const newUser = new User({
          userId: id,
          name: name,
          email: email,
          password: password,
          createdOn: today,
          updatedOn: today
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});



passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password'
},
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw (err);
      if(!user){
        return done(null, false);
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
          console.log('success!');
        } else {
          return done(null, false);
        }
      });
    });
  }));
      
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });
  
  router.post('/login',
    passport.authenticate('local', {failureRedirect: '/users/login'}),
    function(req, res) {
      req.session.Auth = req.user;
    //  console.log(req.session.Auth = req.user)
      res.redirect('/');
  });
  
  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/users/login');
  });
  router.use(function (req, res, next) {
    console.log(res.locals.login)
    res.locals.login = req.isAuthenticated();
    console.log('ok');
    console.log(req.isAuthenticated());
    next()
  });
  
  ///
  
 //router.post('/room', function(req, res){
  //  const { roomname } = req.body;
  //  if (!roomname) {
    //  errors.push({ msg: 'Please enter all fields' });
//    } else {
///      const newRoom = new Room({
  //      roomname,
  //      save()
//    });
//  });
      
module.exports = router;
