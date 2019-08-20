var fs = require('fs');
var https = require('https');
var express = require('express')
var app = express();
const hostname = 'anomic.io';
const port = 443;
var server = https.createServer({
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
var expressValidator = require('express-validator');
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


//set cookie lifetime
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
    secure: false,
  }
}))


var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const errorHandler = require('errorhandler');
mongoose.Promise = global.Promise;

app.use(cors())




var corsOptions = {
  origin: 'https://anomic.io',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



app.use(express.urlencoded({ extended: false }));





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
app.use(helmet())
//TO DO: ADD RATE LIMITER TO PROTECT LOGINS AND DDOS
// configure passport


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
app.use(function(req, res, next) {
  req.user = req.isAuthenticated,
  username = req.user.name;
  var username = req.user.name;
  next();
});
//chat
require("./libs/chat.js").sockets(https);


var usernames = {};
var rooms = require("./models/roomschema");
io.sockets.on('connection', function (socket) {

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(req, res){
		// store the username in the socket session for this client
		// store the room name in the socket session for this client
		socket.room = 'room1';
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		io.emit('updatechat', 'SERVER', 'connected to room1');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('room1').emit('updatechat', 'SERVER', user.name + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
	});

  function sendHeartbeat(){
      setTimeout(sendHeartbeat, 8000);
      io.sockets.emit('ping', { beat : 1 });
  }
  
  io.sockets.on('connection', function (socket) {
      socket.on('pong', function(data){
          console.log("Pong received from client");
      });
  })
  
  setTimeout(sendHeartbeat, 8000);

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.emit('updatechat', user.name, data);
	});

	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', user.name + ' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', user.name + ' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[user.name];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', user.name + ' has disconnected');
		socket.leave(socket.room);
	});
});

const ioChat = io.of("/room");
const userStack = {};
let oldChats, sendUserStack, setRoom;
const userSocket = {};

//socket.io magic starts here
ioChat.on("connection", function(socket) {
  console.log("socketio chat connected.");

  //function to get user name
  socket.on("set-user-data", function(username) {
    console.log(username + "  logged In");

    //storing variable.
    socket.username = username;
    userSocket[socket.username] = socket.id;

    socket.broadcast.emit("broadcast", {
      description: username + " Logged In"
    });

    //getting all users list
    eventEmitter.emit("get-all-users");

    //sending all users list. and setting if online or offline.
    sendUserStack = function() {
      for (i in userSocket) {
        for (j in userStack) {
          if (j == i) {
            userStack[j] = "Online";
          }
        }
      }
      //for popping connection message.
      ioChat.emit("onlineStack", userStack);
    }; //end of sendUserStack function.
  }); //end of set-user-data event.

  //setting room.
  socket.on("set-room", function(room) {
    //leaving room.
    socket.leave(socket.room);
    //getting room data.
    eventEmitter.emit("get-room-data", room);
    //setting room and join.
    setRoom = function(roomId) {
      socket.room = roomId;
      console.log("roomId : " + socket.room);
      socket.join(socket.room);
      ioChat.to(userSocket[socket.username]).emit("set-room", socket.room);
    };
  }); //end of set-room event.

  //emits event to read old-chats-init from database.
  socket.on("old-chats-init", function(data) {
    eventEmitter.emit("read-chat", data);
  });

  //emits event to read old chats from database.
  socket.on("old-chats", function(data) {
    eventEmitter.emit("read-chat", data);
  });

  //sending old chats to client.
  oldChats = function(result, username, room) {
    ioChat.to(userSocket[username]).emit("old-chats", {
      result: result,
      room: room
    });
  };

  //showing msg on typing.
  socket.on("typing", function() {
    socket
      .to(socket.room)
      .broadcast.emit("typing", socket.username + " : is typing...");
  });

  //for showing chats.
  socket.on("chat-msg", function(data) {
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

  //for popping disconnection message.
  socket.on("disconnect", function() {
    console.log(socket.username + "  logged out");
    socket.broadcast.emit("broadcast", {
      description: socket.username + " Logged out"
    });

    console.log("chat disconnected.");

    _.unset(userSocket, socket.username);
    userStack[socket.username] = "Offline";

    ioChat.emit("onlineStack", userStack);
  }); //end of disconnect event.
}); //end of io.on(connection).
//end of socket.io code for chat feature.

//database operations are kept outside of socket.io code.
//saving chats to database.
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

//reading chat from database.
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

//
//

//to verify for unique username and email at signup.
//socket namespace for signup.
const ioSignup = io.of("/signup");

let checkUname, checkEmail; //declaring variables for function.

ioSignup.on("connection", function(socket) {
  console.log("signup connected.");

  //verifying unique username.
  socket.on("checkUname", function(uname) {
    eventEmitter.emit("findUsername", uname); //event to perform database operation.
  }); //end of checkUname event.

  //function to emit event for checkUname.
  checkUname = function(data) {
    ioSignup.to(socket.id).emit("checkUname", data); //data can have only 1 or 0 value.
  }; //end of checkUsername function.

  //verifying unique email.
  socket.on("checkEmail", function(email) {
    eventEmitter.emit("findEmail", email); //event to perform database operation.
  }); //end of checkEmail event.

  //function to emit event for checkEmail.
  checkEmail = function(data) {
    ioSignup.to(socket.id).emit("checkEmail", data); //data can have only 1 or 0 value.
  }; //end of checkEmail function.

  //on disconnection.
  socket.on("disconnect", function() {
    console.log("signup disconnected.");
  });
}); //end of ioSignup connection event.

//database operations are kept outside of socket.io code.
//event to find and check username.
eventEmitter.on("findUsername", function(uname) {
  userModel.find(
    {
      username: uname
    },
    function(err, result) {
      if (err) {
        console.log("Error : " + err);
      } else {
        //console.log(result);
        if (result == "") {
          checkUname(1); //send 1 if username not found.
        } else {
          checkUname(0); //send 0 if username found.
        }
      }
    }
  );
}); //end of findUsername event.

//event to find and check username.
eventEmitter.on("findEmail", function(email) {
  userModel.find(
    {
      email: email
    },
    function(err, result) {
      if (err) {
        console.log("Error : " + err);
      } else {
        //console.log(result);
        if (result == "") {
          checkEmail(1); //send 1 if email not found.
        } else {
          checkEmail(0); //send 0 if email found.
        }
      }
    }
  );
}); //end of findUsername event.

//
//

return io;


// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use(express.static('/semantic'));

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
