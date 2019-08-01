var express = require('express')
  , http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//... 

server.listen(3000);
var expressValidator = require('express-validator');
const helmet = require('helmet')
var cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
var FileStore = require('session-file-store')(session);
const path = require('path')
var exphbs = require('express-handlebars')
const bcrypt = require('bcryptjs');
const User = require("./models/user");
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/admin', {

})
.then(function() {
  console.log("MongoDB connected");
})
.catch(function(error) {
  console.log("Error connecting to MongoDB: " + error);
});
//set cookie lifetime
const TWO_HOURS = 1000 * 60 * 60 * 2
const {
  PORT = 3000,
  NODE_ENV = 'development',
  
  SESS_NAME = 'sid',
  SESS_SECRET = 'awW$weQI90a!W21',
  SESS_LIFETIME = TWO_HOURS
} = process.env
const IN_PROD = NODE_ENV === 'production'
const cons = require('consolidate');
//express session start options:
// secure = HTTPs secure. needs to be on before deployment.
app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: true,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    //secure: IN_PROD
  }
}))


var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const errorHandler = require('errorhandler');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to server.");
});
mongoose.Promise = global.Promise;

const collection = db.collection('users');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use(function(req, res, next) {
    res.locals.user = req.user; // This is the important line
    exports.token = req.user;
    next();
});
var routes = require('./routes/index.js');
var users = require('./routes/users');
var user = require('./models/user');

var engines = require('consolidate');

app.engine('handlebars', engines.handlebars);
app.engine('ejs', engines.ejs);

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');

// this sets the port as 3000 for localhost. node.js environment as production. session name & secret (defined by user's cookie)
'use strict';
var sessionstorage = require('sessionstorage');

app.use('/', routes);
app.use('/users', users);



//TO DO: SET MEMORY STORE TO connect-mongodb-session // is currently in MEMORY STORE, local
// Set public folder as root
//helmet is good for express security
app.use(helmet())
//TO DO: ADD RATE LIMITER TO PROTECT LOGINS AND DDOS
// configure passport


//set port to 3000
const port = 3000;

const isProduction = process.env.NODE_ENV === 'production';

if(!isProduction) {
  app.use(errorHandler());
}

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}


app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

//chat

var usernames = {};
var rooms = ['room1','room2','room3'];
io.sockets.on('connection', function (socket) {

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = 'room1';
		// add the client's username to the global list
		usernames[username] = username;
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'connected to room1');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});


// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// global variables
app.use(function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});
 
app.use(function(req, res, next) {
  isAuthenticated: req.isAuthenticated(),
  next()
});
//search user (for username/profile pics/db info)

//listen to port 3000
