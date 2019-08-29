var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();
const events = require("events");
const _ = require("lodash");
const eventEmitter = new events.EventEmitter();
const hostname = 'anomic.io';
const port = 443;
var server = https.createServer({
url: '/janus',
cert: fs.readFileSync('./config/ssli/anomic_io.crt'),
ca: fs.readFileSync('./config/ssli/anomic_io.ca-bundle'),
key: fs.readFileSync('./config/ssli/private.key'),
requestCert: false,
rejectUnauthorized: false,
},app);
server.listen(443);

//make sure you keep this order
var io = require('socket.io').listen(server);

//... 
//..
var { check, validationResult } = require('express-validator');
const helmet = require('helmet')
var cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
var FileStore = require('session-file-store')(session);
const path = require('path')
var exphbs = require('express-handlebars')
const bcrypt = require('bcryptjs');
const Chat = require("./models/chat");
const User = require("./models/user");
const Room = require("./models/roomschema");
const Image = require("./models/profileimg");
const mongo = require('mongodb');
const mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB connected..'))
.catch(err => console.log(err));


app.use(cors())
const uuidv4 = require('uuid/v4')



var corsOptions = {
  origin: 'https://anomic.io:8089',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(function(req, res, next) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  var username = req.user.name;
  next();
});

app.use(helmet())

app.use(function(req, res, next) {
  res.locals.styleNonce = Buffer.from(uuidv4()).toString('base64')
  next();
});
//
app.use(helmet.contentSecurityPolicy({
 directives: {
   defaultSrc: ["'self'", (req, res) => `'nonce-${res.locals.styleNonce}'`, 'https://anomic.io/:', 'https://anomic.io/janus', 'https://anomic.io:8089/janus', 'https://anomic.io:8088/janus', 'https://www.anomic.io:8089/janus', 'https://www.anomic.io:8088/janus'],
   scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.styleNonce}'`, 'https://anomic.io/socket.io/', 'https://www.anomic.io/socket.io/', '/socket.io/socket.io.js', 'https://anomic.io/socket.io/', 'https://www.anomic.io/socket.io/',  'https://anomic.io/semantic', 'https://anomic.io/handlebars', 'https://anomic.io/janus', 'https://www.anomic.io/janus', 'https://www.anomic.io/janus/*', 'https://www.anomic.io/videoroom', 'https://anomic.io/videoroom', 'https://www.anomic.io/semantic', 'https://www.anomic.io/semantic/*', 'https://www.anomic.io/jquery/*', 'https://anomic.io/jquery/*', 'https://anomic.io/videoroom', 'https://anomic.io/simplewebrtc', 'https://anomic.io/socket.io', 'https://anomic.io/js', 'https://anomic.io/jquery/dist/jquery.js', 'https://code.jquery.com/', 'https://maxcdn.bootstrapcdn.com/', 'https://cdnjs.cloudflare.com/', 'https://toert.github.io', 'https://www.webrtc-experiment.com/', 'https://unpkg.com/'],
   styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.styleNonce}'`, 'https://www.anomic.io/js/*', 'https://anomic.io/js/*', 'https://anomic.io/js', 'https://anomic.io/scripts', 'https://cdnjs.cloudflare.com/', 'https://maxcdn.bootstrapcdn.com/', 'https://toert.github.io/', 'https://fonts.googleapis.com/', 'https://anomic.io/semantic', 'https://anomic.io/semantic/dist/', 'https://unpkg.com', ],
   fontSrc: ["'self'", 'https://anomic.io/scripts', 'https://cdnjs.cloudflare.com/', 'https://www.cdnjs.cloudflare.com/', 'https://code.jquery.com/', 'https://www.code.jquery.com/', 'https://anomic.io/*', 'https://anomic.io/semantic/', 'https://fonts.gstatic.com', 'https://maxcdn.bootstrapcdn.com/', 'https://fonts.googleapis.com/', 'https://anomic.io/semantic/dist/'],
   imgSrc: ["'self'"],
   objectSrc: ["'none'"],
   formAction: ["'self'"],
   connectSrc: ["'self'", 'https://www.anomic.io:8089/janus', 'https://anomic.io/images', 'https://www.anomic.io/images', 'https://anomic.io/socket.io/', 'https://www.anomic.io/socket.io/', 'https://www.anomic.io:8089/socket.io', 'https://anomic.io/socket.io/', 'https://www.anomic.io/socket.io/',  'https://www.anomic.io/images/', 'https://www.anomic.io:8089/*', 'https://www.anomic.io:80', 'https://www.anomic.io:443', 'https://www.anomic.io:8088/janus', 'https://www.anomic.io:*', 'https://www.anomic.io/*', 'https://anomic.io:*', 'wss://anomic.io:*', 'https://anomic.io', 'https://anomic.io:*/janus', 'https://anomic.io/videoroom', 'http://anomic.io/janus', 'http://anomic.io/videoroom', 'https://anomic.io:8089/janus', 'https://anomic.io:8088/janus' ],
   frameSrc: ["'self'", 'https://www.webrtc-experiment.com/'],
   upgradeInsecureRequests: true,
   workerSrc: false,
 },
 browserSniff: false
}));


// app.use(function (req, res, next) {
//   res.locals.nonce = uuidv4()
//   next()
// })
// 
// app.use(csp({
//   directives: {
//     scriptSrc: [
//       "'self'",
//       (req, res) => `'nonce-${res.locals.nonce}'`  // 'nonce-614d9122-d5b0-4760-aecf-3a5d17cf0ac9'
//     ]
//   }
// }))
// 
// app.use(function (req, res) {
//   res.end(`<script nonce="${res.locals.nonce}">alert(1 + 1);</script>`)
// })
// 

app.use(helmet.hidePoweredBy({ setTo: 'DynamoDB (AWS)' }))

app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.expectCt())
app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'none'"],
    payment: ["'none'"],
    syncXhr: ["'none'"],
    accelerometer: ["'none'"],
    geolocation: ["'none'"],
    gyroscope: ["'none'"],
    magnetometer: ["'none'"],
    usb: ["'none'"],
  }
}))
app.use(helmet.noCache())
//TO DO: ADD RATE LIMITER TO PROTECT LOGINS AND DDOS
// configure passport


// Sets "Referrer-Policy: same-origin".
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

// Sets "Referrer-Policy: unsafe-url".
app.use(helmet.referrerPolicy({ policy: 'unsafe-url' }))

// Sets "Referrer-Policy: no-referrer,unsafe-url"
app.use(helmet.referrerPolicy({
  policy: ['no-referrer', 'unsafe-url']
}))

// Sets "Referrer-Policy: no-referrer".
app.use(helmet.referrerPolicy())




const TWO_HOURS = 1000 * 60 * 60 * 2
const {
  PORT = 443,
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
    httpOnly: true,
    sameSite: true,
    secure: true,
    domain: '.anomic.io',
  }
}))


var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const errorHandler = require('errorhandler');
mongoose.Promise = global.Promise;




app.use(express.urlencoded({ extended: false }));



const SocketAntiSpam  = require('socket-anti-spam');

const socketAntiSpam = new SocketAntiSpam({
  banTime:            1,         // Ban time in minutes
  kickThreshold:      16,          // User gets kicked after this many spam score
  kickTimesBeforeBan: 3,          // User gets banned after this many kicks
  banning:            true,       // Uses temp IP banning after kickTimesBeforeBan
  io:                 io,  // Bind the socket.io variable
})

// Call functions with created reference 'socketAntiSpam'
socketAntiSpam.event.on('ban', data => {
  console.log('You have been banned for 1 minute due to spam. Please wait 1 minute then refresh.');
})

socketAntiSpam.event.on('kick', data => {
  console.log('You have been kicked due to spam, please refresh');
})



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
app.use('/room', routes, users);


const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");


cloudinary.config({
cloud_name: 'dfbstyaqa',
api_key: '838116593586736',
api_secret: 'zi-GCPqDBsAjaTInss9-lFSxdWQ',
});
const storage = cloudinaryStorage({
cloudinary: cloudinary,
folder: "demo",
allowedFormats: ["jpg", "png"],
transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

const today = Date.now();

app.post('/newroom', function(req, res, next) {
    
    //User is the model created in app.js of this project
    var newRoom = new Room({
      name1: req.body.name1,
      name2: req.body.name1,
      members: [],
      createdOn: today,
      updatedOn: today    
    });
    
    
    console.log(newRoom.name1);
    // save the user
    newRoom.save(function(err) {
      if (err) throw err;
      console.log('Room created!');
      console.log(req.room);
      console.log(req.session.chat);
      
      res.redirect('/room?name=' + '' + req.body.name1);
      res.render('index.ejs', { room: newRoom, chat: req.session.chat });
    });

});

app.post('/api/images', parser.single("image"), (req, res) => {
  console.log(req.file) // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  Image.create(image) // save image information in database
    .then(newImage => res.json(newImage), res.redirect('/profile'))
    .catch(err => console.log(err));
});


app.use(function(req, res, next) {
  res.locals.user = req.user || null;
    if(req.user == null){
      username = 'guest';
    }
  next();
});
//TO DO: SET MEMORY STORE TO connect-mongodb-session // is currently in MEMORY STORE, local
// Set public folder as root
//helmet is good for express security



//set port to 3000
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
require("./libs/chat.js").sockets(https);

const userModel = mongoose.model("User");
const chatModel = mongoose.model("Chat");
const roomModel = mongoose.model("Room");



var usernames = {};
var rooms = require("./models/roomschema");
var chat = require("./models/chat");
// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
const ioChat = io.of("/room?name=:room");
const userStack = {};
let oldChats, sendUserStack, setRoom;
const userSocket = {};




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
		socket.emit('serverupdatechat', 'Connected to room1');
		// echo to room 1 that a person has connected to their room
	//	socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});
  socket.on("updatechat", function(data) {
    //emits event to save chat to database.
    eventEmitter.emit("save-chat", {
      msgFrom: socket.username,
      msgTo: data.msgTo,
      msg: data.msg,
      room: socket.room,
      date: data.date
    });
    //emits event to send chat msg to all clients.
    ioChat.to(socket.room).emit("chat-msg", {
      msgFrom: socket.username,
      msg: data.msg,
      date: data.date
    });
  });
  
	// when the client emits 'sendchat', this listens and executes

  
  
  
  eventEmitter.on("save-chat", function(data) {
    // var today = Date.now();

    var newChat = new chatModel({
      msgFrom: data.msgFrom,
      msgTo: data.msgTo,
      msg: data.msg,
      room: data.room,
      createdOn: data.date
    });

    newChat.save(function(err, result) {
      if (err) {
        console.log("Error : " + err);
      } else if (result == undefined || result == null || result == "") {
        console.log("Chat Is Not Saved.");
      } else {
        console.log("Chat Saved.");
        //console.log(result);
      }
    });
  }); //end of saving chat.
  
  eventEmitter.on("read-chat", function(data) {
    chatModel
      .find({})
      .where("room")
      .equals(data.room)
      .sort("-createdOn")
      .skip(data.msgCount)
      .lean()
      .limit(5)
      .exec(function(err, result) {
        if (err) {
          console.log("Error : " + err);
        } else {
          //calling function which emits event to client to show chats.
          oldChats(result, data.username, data.room);
        }
      });
  }); //end of reading chat from database.

  //listening for get-all-users event. creating list of all users.
  eventEmitter.on("get-all-users", function() {
    userModel
      .find({})
      .select("username")
      .exec(function(err, result) {
        if (err) {
          console.log("Error : " + err);
        } else {
          //console.log(result);
          for (var i = 0; i < result.length; i++) {
            userStack[result[i].username] = "Offline";
          }
          //console.log("stack "+Object.keys(userStack));
          sendUserStack();
        }
      });
  }); //end of get-all-users event.

  //listening get-room-data event.
  eventEmitter.on("get-room-data", function(room) {
    roomModel.find(
      {
        $or: [
          {
            name1: room.name1
          },
          {
            name1: room.name2
          },
          {
            name2: room.name1
          },
          {
            name2: room.name2
          }
        ]
      },
      function(err, result) {
        if (err) {
          console.log("Error : " + err);
        } else {
          if (result == "" || result == undefined || result == null) {
            var today = Date.now();

            newRoom = new roomModel({
              name1: room.name1,
              name2: room.name2,
              lastActive: today,
              createdOn: today
            });

            newRoom.save(function(err, newResult) {
              if (err) {
                console.log("Error : " + err);
              } else if (
                newResult == "" ||
                newResult == undefined ||
                newResult == null
              ) {
                console.log("Some Error Occured During Room Creation.");
              } else {
                setRoom(newResult._id); //calling setRoom function.
              }
            }); //end of saving room.
          } else {
            var jresult = JSON.parse(JSON.stringify(result));
            setRoom(jresult[0]._id); //calling setRoom function.
          }
        } //end of else.
      }
    ); //end of find room.
  }); //end of get-room-data listener.
  //end of database operations for chat feature.
  socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
      //emits event to save chat to database.
  });
	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
//		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
//		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
//		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
	//	socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});


// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use(express.static('/semantic'));

app.use(express.static('/libs/'));

// global variables

app.use(function(req, res, next) {
   res.locals.url = {
       query : req.query,
       url   : req.originalUrl
   }

   next();
});
 
app.use(function(req, res, next) {
  isAuthenticated: req.isAuthenticated(),
  next()
});
//search user (for username/profile pics/db info)


//listen to port 3000
