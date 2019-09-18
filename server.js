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
pingTimeout: 60000,
},app);
server.listen(443);
var router = express.Router();

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


app.use(function(req, res, next) {
   res.locals.url = {
       query : req.query,
       url   : req.originalUrl
   }

   next();
});

var corsOptions = {
  origin: 'https://anomic.io:8089',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// app.use(function(req, res, next) {
//   req.user = req.isAuthenticated,
//   username = req.user.name;
//   var username = req.user.name;
//   next();
// });



app.use(helmet())

app.use(function(req, res, next) {
  res.locals.styleNonce = Buffer.from(uuidv4()).toString('base64')
  next();
});
//
app.use(helmet.contentSecurityPolicy({
 directives: {
   defaultSrc: ["'self'", (req, res) => `'nonce-${res.locals.styleNonce}'`, 'https://anomic.io/:', 'https://anomic.io/janus', 'https://anomic.io:8089/janus', 'https://anomic.io:8088/janus', 'https://www.anomic.io:8089/janus', 'https://www.anomic.io:8088/janus'],
   scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.styleNonce}'`, 'https://anomic.io/socket.io/', 'https://www.youtube.com/', 'https://apis.google.com/', 'https://www.anomic.io/socket.io/', '/socket.io/socket.io.js', 'https://anomic.io/socket.io/', 'https://www.anomic.io/socket.io/',  'https://anomic.io/semantic', 'https://anomic.io/handlebars', 'https://anomic.io/janus', 'https://s.ytimg.com/', 'https://www.anomic.io/janus', 'https://www.anomic.io/janus/*', 'https://www.anomic.io/videoroom', 'https://anomic.io/videoroom', 'https://www.anomic.io/semantic', 'https://www.anomic.io/semantic/*', 'https://www.anomic.io/jquery/*', 'https://anomic.io/jquery/*', 'https://anomic.io/videoroom', 'https://anomic.io/simplewebrtc', 'https://anomic.io/socket.io', 'https://anomic.io/js', 'https://anomic.io/jquery/dist/jquery.js', 'https://code.jquery.com/', 'https://maxcdn.bootstrapcdn.com/', 'https://cdnjs.cloudflare.com/', 'https://toert.github.io', 'https://www.webrtc-experiment.com/', 'https://unpkg.com/', 'https://apis.google.com/js/', 'https://apis.google.com/', 'https://www.googleads.g.doubleclick.net/', 'https://www.static.doubleclick.net', 'https://www.youtube.com', 'https://s.ytimg.com/', 'https://player.vimeo.com/', 'https://www.vimeo.com/', 'https://api.dmcdn.net/', 'https://dailymotion.com/'],
   styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.styleNonce}'`, 'https://www.anomic.io/js/*', 'https://img.youtube.com/', 'https://anomic.io/js/*', 'https://anomic.io/js', 'https://anomic.io/scripts', 'https://cdnjs.cloudflare.com/', 'https://maxcdn.bootstrapcdn.com/', 'https://toert.github.io/', 'https://fonts.googleapis.com/', 'https://anomic.io/semantic', 'https://anomic.io/semantic/dist/', 'https://unpkg.com', 'https://s.ytimg.com/', 'https://youtube.com/', 'https://www.youtube.com/'],
   fontSrc: ["'self'", 'https://anomic.io/scripts', 'https://cdnjs.cloudflare.com/', 'https://www.cdnjs.cloudflare.com/', 'https://code.jquery.com/', 'https://www.code.jquery.com/', 'https://anomic.io/*', 'https://anomic.io/semantic/', 'https://fonts.gstatic.com', 'https://maxcdn.bootstrapcdn.com/', 'https://fonts.googleapis.com/', 'https://anomic.io/semantic/dist/', 'https://s.ytimg.com/'],
   imgSrc: ["'self'", 'https://csi.gstatic.com', 'https://img.youtube.com/', 'https://www.youtube.com', 'https://s.ytimg.com/'],
   objectSrc: ["'none'"],
   formAction: ["'self'"],
   connectSrc: ["'self'", 'https://www.youtube.com', 'https://google.com', 'https://youtube.com', 'https://www.google.com', 'https://www.anomic.io:8089/janus', 'https://www.anomic.io/socket.io', 'https://anomic.io/images', 'https://www.anomic.io/images', 'https://anomic.io/socket.io/', 'https://www.anomic.io/socket.io/', 'https://www.anomic.io:8089/socket.io', 'https://anomic.io/socket.io/', 'https://www.anomic.io/socket.io/',  'https://www.anomic.io/images/', 'https://www.anomic.io:8089/*', 'https://www.anomic.io:80', 'https://www.anomic.io:443', 'https://www.anomic.io:8088/janus', 'https://www.anomic.io:*', 'https://www.anomic.io/*', 'https://anomic.io:*', 'wss://anomic.io:*', 'https://anomic.io', 'https://anomic.io:*/janus', 'https://anomic.io/videoroom', 'http://anomic.io/janus', 'http://anomic.io/videoroom', 'https://anomic.io:8089/janus', 'https://anomic.io:8088/janus', 'wss://www.anomic.io:8089/janus', 'ws://www.anomic.io:8089/janus', 'https://www.youtube.com', 'https://www.youtube.com/pagead/viewthroughconversion/', 'https://s.ytimg.com/', 'https://www.vimeo.com/', 'https://api.dmcdn.net/', 'https://dailymotion.com/'],
   frameSrc: ["'self'", 'https://www.webrtc-experiment.com/', 'https://img.youtube.com/', 'https://www.youtube.com/', 'https://content.googleapis.com/', 'https://www.content.googleapis.com/', 'https://www.googleads.g.doubleclick.net/', 'https://www.static.doubleclick.net', 'https://player.vimeo.com/', 'https://www.youtube.com', 'http://www.youtube.com', 'https://youtube.com', 'https://www.player.vimeo.com/', 'https://www.player.vimeo.com/', 'https://www.youtube.com/pagead/viewthroughconversion/', 'https://s.ytimg.com/', 'https://player.vimeo.com/', 'https://www.vimeo.com/', 'https://api.dmcdn.net/', 'https://dailymotion.com/', 'https://vimeo.com/', 'https://www.dailymotion.com/'],
   mediaSrc: ["'self'", 'https://commondatastorage.googleapis.com/', 'https://www.youtube.com', 'https://youtube.com', 'https://player.vimeo.com/', 'http://www.youtube.com', 'https://youtube.com', 'https://www.youtube.com/pagead/viewthroughconversion/', 'https://s.ytimg.com/'],
   // upgradeInsecureRequests: true,
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



// const SocketAntiSpam  = require('socket-anti-spam');
// 
// const socketAntiSpam = new SocketAntiSpam({
//   banTime:            1,         // Ban time in minutes
//   kickThreshold:      16,          // User gets kicked after this many spam score
//   kickTimesBeforeBan: 3,          // User gets banned after this many kicks
//   banning:            true,       // Uses temp IP banning after kickTimesBeforeBan
//   io:                 io,  // Bind the socket.io variable
// })
// 
// // Call functions with created reference 'socketAntiSpam'
// socketAntiSpam.event.on('ban', data => {
//   console.log('You have been banned for 1 minute due to spam. Please wait 1 minute then refresh.');
// })
// 
// socketAntiSpam.event.on('kick', data => {
//   console.log('You have been kicked due to spam, please refresh');
// })

var username;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use(function(req, res, next) {
    res.locals.user = req.user; // This is the important line
    exports.token = req.user;
      if (req.user === undefined)
      req.user === 'guest'
      
      if (req.user === null)
      req.user === 'guest'
      
      if (req.user)
      req.user === username;
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

app.get('./server.js', function(req, res) {
 res.sendStatus(400);
});

app.get('./routes/index.js', function(req, res) {
 res.sendStatus(400);
});

app.get('./janus.js', function(req, res) {
 res.sendStatus(400);
});

app.get('./config/keys.js', function(req, res) {
 res.sendStatus(400);
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
require("./libs/play.js").sockets(https);


// var rooms = ['1','2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
// // usernames which are currently connected to the chat
// var usernames = {};
// // rooms which are currently available in chat
// const sessionsMap = {};
// var clients = [];
// var users = {};

var ids = {};
const YT3_API_KEY = 'AIzaSyCuKhQw-AouTjuiEIKquFiJuiWgpffr-LM';
const VM_API_KEY = 'biQnjEMy7RqMV1Tn37VhPAWxVF7411gbSiglfICUAAaeCwFX1+Gy/HqI4vOe6dYy2qfgAR4qzwqe4guVnUio3ptnObAcqCHseywHAu+EoElpc4bbH88cpDdRQFmx2hAI';
const DM_API_KEY = '3b47b316af2962e6c94c';




users = [];
connections = [];
rooms = [];
// Store all of the sockets and their respective room numbers
userrooms = {}

YT3_API_KEY = process.env.YT3_API_KEY
DM_API_KEY = process.env.DM_API_KEY

// Set given room for url parameter
var given_room = ""




// app.param('room', function(req,res, next, room){
//     console.log("testing")
//     console.log(room)
//     given_room = room
// res.sendFile(__dirname + '/index.html');
// });





//var roomno = 1;
/*
io.on('connection', function(socket) {
   //Increase roomno 2 clients are present in a room.
   //if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
   // For now have it be the same room for everyone!
   socket.join("room-"+roomno);
   //Send this event to everyone in the room.
   io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
})*/

var roomno = 1;

io.sockets.on('connection', function(socket) {
    // Connect Socket
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Set default room, if provided in url
    socket.emit('set id', {
        id: given_room
    })

    // io.sockets.emit('broadcast',{ description: connections.length + ' clients connected!'});

    // For now have it be the same room for everyone!
    //socket.join("room-"+roomno);

    //Send this event to everyone in the room.
    //io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);

    // reset url parameter
    // Workaround because middleware was not working right
    socket.on('reset url', function(data) {
        given_room = ""
    });

    // Disconnect
    socket.on('disconnect', function(data) {

        // If socket username is found
        if (users.indexOf(socket.username) != -1) {
            users.splice((users.indexOf(socket.username)), 1);
            updateUsernames();
        }

        connections.splice(connections.indexOf(socket), 1);
        console.log(socket.id + ' Disconnected: %s sockets connected', connections.length);
        // console.log(io.sockets.adapter.rooms['room-' + socket.roomnum])
        // console.log(socket.roomnum)


        // HOST DISCONNECT
        // Need to check if current socket is the host of the roomnum
        // If it is the host, needs to auto assign to another socket in the room

        // Grabs room from userrooms data structure
        var id = socket.id
        var roomnum = userrooms[id]
        var room = io.sockets.adapter.rooms['room-' + roomnum]

        // If you are not the last socket to leave
        if (room !== undefined) {
            // If you are the host
            if (socket.id == room.host) {
                // Reassign
                console.log("hello i am the host " + socket.id + " and i am leaving my responsibilities to " + Object.keys(room.sockets)[0])
                io.to(Object.keys(room.sockets)[0]).emit('autoHost', {
                    roomnum: roomnum
                })
            }

            // Remove from users list
            // If socket username is found
            if (room.users.indexOf(socket.username) != -1) {
                room.users.splice((room.users.indexOf(socket.username)), 1);
                updateRoomUsers(roomnum);
            }
        }

        // Delete socket from userrooms
        delete userrooms[id]

    });

    // ------------------------------------------------------------------------
    // New room
    socket.on('new room', function(data, callback) {
        //callback(true);
        // Roomnum passed through
        socket.roomnum = data;

        // This stores the room data for all sockets
        userrooms[socket.id] = data

        var host = null
        var init = false

        // Sets default room value to 1
        if (socket.roomnum == null || socket.roomnum == "") {
            socket.roomnum = '1'
            userrooms[socket.id] = '1'
        }

        // Adds the room to a global array
        if (!rooms.includes(socket.roomnum)) {
            rooms.push(socket.roomnum);
        }

        // Checks if the room exists or not
        // console.log(io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined)
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] === undefined) {
            socket.send(socket.id)
            // Sets the first socket to join as the host
            host = socket.id
            init = true

            // Set the host on the client side
            socket.emit('setHost');
            //console.log(socket.id)
        } else {
            console.log(socket.roomnum)
            host = io.sockets.adapter.rooms['room-' + socket.roomnum].host
        }

        // Actually join the room
        console.log(socket.username + " connected to room-" + socket.roomnum)
        socket.join("room-" + socket.roomnum);

        // Sets the default values when first initializing
        if (init) {
            // Sets the host
            io.sockets.adapter.rooms['room-' + socket.roomnum].host = host
            // Default Player
            io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer = 0
            // Default video
            io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo = {
                yt: 'M7lc1UVf-VE',
                dm: 'x26m1j4',
                vimeo: '76979871',
                html5: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            }
            // Previous Video
            io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo = {
                yt: {
                    id: 'M7lc1UVf-VE',
                    time: 0
                },
                dm: {
                    id: 'x26m1j4',
                    time: 0
                },
                vimeo: {
                    id: '76979871',
                    time: 0
                },
                html5: {
                    id: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    time: 0
                }
            }
            // Host username
            io.sockets.adapter.rooms['room-' + socket.roomnum].hostName = socket.username
            // Keep list of online users
            io.sockets.adapter.rooms['room-' + socket.roomnum].users = [socket.username]
            // Set an empty queue
            io.sockets.adapter.rooms['room-' + socket.roomnum].queue = {
                yt: [],
                dm: [],
                vimeo: [],
                html5: []
            }
        }

        // Set Host label
        io.sockets.in("room-" + socket.roomnum).emit('changeHostLabel', {
            username: io.sockets.adapter.rooms['room-' + socket.roomnum].hostName
        })

        // Set Queue
        updateQueueVideos()

        // Gets current video from room variable
        switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
            case 0:
                var currVideo = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.yt
                break;
            case 1:
                var currVideo = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.dm
                break;
            case 2:
                var currVideo = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.vimeo
                break;
            case 3:
                var currVideo = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.html5
                break;
            default:
                console.log("Error invalid player id")
        }
        var currYT = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.yt

        // Change the video player to current One
        switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
            case 0:
                // YouTube is default so do nothing
                break;
            case 1:
                io.sockets.in("room-" + socket.roomnum).emit('createDaily', {});
                break;
            case 2:
                io.sockets.in("room-" + socket.roomnum).emit('createVimeo', {});
                break;
            case 3:
                io.sockets.in("room-" + socket.roomnum).emit('createHTML5', {});
                break;
            default:
                console.log("Error invalid player id")
        }

        // Change the video to the current one
        socket.emit('changeVideoClient', {
            videoId: currVideo
        });

        // Get time from host which calls change time for that socket
        if (socket.id != host) {
            //socket.broadcast.to(host).emit('getTime', { id: socket.id });
            console.log("call the damn host " + host)

            // Set a timeout so the video can load before it syncs
            setTimeout(function() {
                socket.broadcast.to(host).emit('getData');
            }, 1000);
            //socket.broadcast.to(host).emit('getData');

            // Push to users in the room
            io.sockets.adapter.rooms['room-' + socket.roomnum].users.push(socket.username)

            // socket.emit('changeVideoClient', {
            //     videoId: currVideo
            // });

            // This calls back the function on the host client
            //callback(true)

            // DISABLE CONTROLS - DEPRECATED
            // socket.emit('hostControls');
        } else {
            console.log("I am the host")
            //socket.emit('auto sync');

            // Auto syncing is not working atm
            // socket.broadcast.to(host).emit('auto sync');
        }

        // Update online users
        updateRoomUsers(socket.roomnum)

        // This is all of the rooms
        // io.sockets.adapter.rooms['room-1'].currVideo = "this is the video"
        // console.log(io.sockets.adapter.rooms['room-1']);
    });
    // ------------------------------------------------------------------------



    // ------------------------------------------------------------------------
    // ------------------------- Socket Functions -----------------------------
    // ------------------------------------------------------------------------

    // Play video
    socket.on('play video', function(data) {
        var roomnum = data.room
        io.sockets.in("room-" + roomnum).emit('playVideoClient');
    });

    // Event Listener Functions
    // Broadcast so host doesn't continuously call it on itself!
    socket.on('play other', function(data) {
        var roomnum = data.room
        socket.broadcast.to("room-" + roomnum).emit('justPlay');
    });

    socket.on('pause other', function(data) {
        var roomnum = data.room
        socket.broadcast.to("room-" + roomnum).emit('justPause');
    });

    socket.on('seek other', function(data) {
        var roomnum = data.room
        var currTime = data.time
        socket.broadcast.to("room-" + roomnum).emit('justSeek', {
            time: currTime
        });

        // Sync up
        // host = io.sockets.adapter.rooms['room-' + roomnum].host
        // console.log("let me sync "+host)
        // socket.broadcast.to(host).emit('getData');
    });

    socket.on('play next', function(data, callback) {
        var videoId = "QUEUE IS EMPTY"
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    if (io.sockets.adapter.rooms['room-' + socket.roomnum].queue.yt.length > 0) {
                        // Gets the video id from the room object
                        videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].queue.yt.shift().videoId
                    }
                    break;
                case 1:
                    if (io.sockets.adapter.rooms['room-' + socket.roomnum].queue.dm.length > 0) {
                        videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].queue.dm.shift().videoId
                    }
                    break;
                case 2:
                    if (io.sockets.adapter.rooms['room-' + socket.roomnum].queue.dm.length > 0) {
                        videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].queue.vimeo.shift().videoId
                    }
                    break;
                case 3:
                    if (io.sockets.adapter.rooms['room-' + socket.roomnum].queue.html5.length > 0) {
                        videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].queue.html5.shift().videoId
                    }
                    break;
                default:
                    console.log("Error invalid player id")
            }
            // console.log(videoId)
            // Remove video from the front end
            updateQueueVideos()
            callback({
                videoId: videoId
            })
        }
    });

    // Sync video
    socket.on('sync video', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var roomnum = data.room
            var currTime = data.time
            var state = data.state
            var videoId = data.videoId
            var playerId = io.sockets.adapter.rooms['room-' + roomnum].currPlayer
            // var videoId = io.sockets.adapter.rooms['room-'+roomnum].currVideo
            io.sockets.in("room-" + roomnum).emit('syncVideoClient', {
                time: currTime,
                state: state,
                videoId: videoId,
                playerId: playerId
            })
        }
    });

    // Enqueue video
    // Gets title then calls back
    socket.on('enqueue video', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            test = false
            var user = data.user
            var videoId = data.videoId
            var title = ""
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    // See yt.js file
                    socket.emit('get title', {
                        videoId: videoId,
                        user: user,
                        api_key: YT3_API_KEY
                    }, function(data) {
                        videoId = data.videoId
                        title = data.title
                        io.sockets.adapter.rooms['room-' + socket.roomnum].queue.yt.push({
                            videoId: videoId,
                            title: title
                        })
                        console.log(io.sockets.adapter.rooms['room-' + socket.roomnum].queue.yt)
                        // Update front end
                        updateQueueVideos()
                    })
                    break;
                case 1:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.dm.push({
                        videoId: videoId,
                        title: title
                    })
                    break;
                case 2:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.vimeo.push({
                        videoId: videoId,
                        title: title
                    })
                    break;
                case 3:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.html5.push({
                        videoId: videoId,
                        title: title
                    })
                    break;
                default:
                    console.log("Error invalid player id")
            }
        }
    })

    // Enqueue playlist
    // Gets all of the playlist videos and enqueues them
    // Only supported for YouTube
    socket.on('enqueue playlist', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var user = data.user
            var playlistId = data.playlistId
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    // See yt.js file
                    socket.emit('get playlist videos', {
                        playlistId: playlistId,
                        user: user,
                        api_key: YT3_API_KEY
                    })
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                default:
                    console.log("Error invalid player id")
            }
        }
    })

    // Empty the queue
    socket.on('empty queue', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.yt = []
                    break;
                case 1:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.dm = []
                    break;
                case 2:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.vimeo = []
                    break;
                case 3:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.html5 = []
                    break;
                default:
                    console.log("Error invalid player id")
            }
            updateQueueVideos()
        }
    })

    // Remove a specific video from queue
    socket.on('remove at', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var idx = data.idx
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.yt.splice(idx, 1)
                    break;
                case 1:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.dm.splice(idx, 1)
                    break;
                case 2:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.vimeo.splice(idx, 1)
                    break;
                case 3:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.html5.splice(idx, 1)
                    break;
                default:
                    console.log("Error invalid player id")
            }
            updateQueueVideos()
        }
    })

    // Play a specific video from queue
    socket.on('play at', function(data, callback) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var idx = data.idx
            var videoId = ""
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].queue.yt[idx].videoId
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.yt.splice(idx, 1)
                    break;
                case 1:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.dm.splice(idx, 1)
                    break;
                case 2:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.vimeo.splice(idx, 1)
                    break;
                case 3:
                    io.sockets.adapter.rooms['room-' + socket.roomnum].queue.html5.splice(idx, 1)
                    break;
                default:
                    console.log("Error invalid player id")
            }
            updateQueueVideos()
            callback({
                videoId: videoId
            })
        }
    })

    // Change video
    socket.on('change video', function(data, callback) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var roomnum = data.room
            var videoId = data.videoId
            var time = data.time
            var host = io.sockets.adapter.rooms['room-' + socket.roomnum].host

            // This changes the room variable to the video id
            // io.sockets.adapter.rooms['room-' + roomnum].currVideo = videoId
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    // Set prev video before changing
                    io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.yt.id = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.yt
                    io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.yt.time = time
                    // Set new video id
                    io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.yt = videoId
                    break;
                case 1:
                    // Set prev video before changing
                    io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.dm.id = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.dm
                    io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.dm.time = time
                    // Set new video id
                    io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.dm = videoId
                    break;
                case 2:
                    // Set prev video before changing
                    io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.vimeo.id = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.vimeo
                    io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.vimeo.time = time
                    // Set new video id
                    io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.vimeo = videoId
                    break;
                case 3:
                    // Set prev video before changing
                    io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.html5.id = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.html5
                    io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.html5.time = time
                    // Set new video id
                    io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.html5 = videoId
                    break;
                default:
                    console.log("Error invalid player id")
            }

            io.sockets.in("room-" + roomnum).emit('changeVideoClient', {
                videoId: videoId
            });

            // If called from previous video, do a callback to seek to the right time
            if (data.prev) {
                // Call back to return the video id
                callback()
            }

        }

        // Auto sync with host after 1000ms of changing video
        // NOT NEEDED ANYMORE, IN THE CHANGEVIDEOCLIENT FUNCTION
        // setTimeout(function() {
        //     socket.broadcast.to(host).emit('getData');
        // }, 1000);

        // console.log(io.sockets.adapter.rooms['room-1'])
    });

    // Change to previous video
    socket.on('change previous video', function(data, callback) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var roomnum = data.room
            var host = io.sockets.adapter.rooms['room-' + socket.roomnum].host

            // This sets the videoId to the proper previous video
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    var videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.yt.id
                    var time = io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.yt.time
                    break;
                case 1:
                    var videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.dm.id
                    var time = io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.dm.time
                    break;
                case 2:
                    var videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.vimeo.id
                    var time = io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.vimeo.time
                    break;
                case 3:
                    var videoId = io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.html5.id
                    var time = io.sockets.adapter.rooms['room-' + socket.roomnum].prevVideo.html5.time
                    break;
                default:
                    console.log("Error invalid player id")
            }

            console.log("Hot Swapping to Previous Video: " + videoId + " at current time: " + time)
            // Callback to go back to client to request the video change
            callback({
                videoId: videoId,
                time: time
            })
        }
    })

    // Get video id based on player
    socket.on('get video', function(callback) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            // Gets current video from room variable
            switch (io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer) {
                case 0:
                    var currVideo = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.yt
                    break;
                case 1:
                    var currVideo = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.dm
                    break;
                case 2:
                    var currVideo = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.vimeo
                    break;
                case 3:
                    var currVideo = io.sockets.adapter.rooms['room-' + socket.roomnum].currVideo.html5
                    break;
                default:
                    console.log("Error invalid player id")
            }
            // Call back to return the video id
            callback(currVideo)
        }
    })

    // Change video player
    socket.on('change player', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var roomnum = data.room
            var playerId = data.playerId

            io.sockets.in("room-" + roomnum).emit('pauseVideoClient');
            // console.log(playerId)
            switch (playerId) {
                case 0:
                    io.sockets.in("room-" + roomnum).emit('createYoutube', {});
                    break;
                case 1:
                    io.sockets.in("room-" + roomnum).emit('createDaily', {});
                    break;
                case 2:
                    io.sockets.in("room-" + roomnum).emit('createVimeo', {});
                    break;
                case 3:
                    io.sockets.in("room-" + roomnum).emit('createHTML5', {});
                    break;
                default:
                    console.log("Error invalid player id")
            }

            // This changes the room variable to the player id
            io.sockets.adapter.rooms['room-' + roomnum].currPlayer = playerId
            // console.log(io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer)

            // This syncs the host whenever the player changes
            host = io.sockets.adapter.rooms['room-' + socket.roomnum].host
            socket.broadcast.to(host).emit('getData')
        }

    })

    // Change video player
    socket.on('change single player', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var playerId = data.playerId

            switch (playerId) {
                case 0:
                    socket.emit('createYoutube', {});
                    break;
                case 1:
                    socket.emit('createDaily', {});
                    break;
                case 2:
                    socket.emit('createVimeo', {});
                    break;
                case 3:
                    socket.emit('createHTML5', {});
                    break;
                default:
                    console.log("Error invalid player id")
            }
            // After changing the player, resync with the host
            host = io.sockets.adapter.rooms['room-' + socket.roomnum].host
            socket.broadcast.to(host).emit('getData')
        }
    })


    // Send Message in chat
    socket.on('send message', function(data) {
        var encodedMsg = data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        // console.log(data);
        io.sockets.in("room-" + socket.roomnum).emit('new message', {
            msg: encodedMsg,
            user: socket.username
        });
    });

    // New User
    socket.on('new user', function(data, callback) {
        callback(true);
        // Data is username
        var encodedUser = data.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        socket.username = encodedUser;
        //console.log(socket.username)
        users.push(socket.username);
        updateUsernames();
    });

    // Changes time for a specific socket
    socket.on('change time', function(data) {
        // console.log(data);
        var caller = data.id
        var time = data.time
        socket.broadcast.to(caller).emit('changeTime', {
            time: time
        });
    });

    // This just calls the syncHost function
    socket.on('sync host', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            //socket.broadcast.to(host).emit('syncVideoClient', { time: time, state: state, videoId: videoId });
            var host = io.sockets.adapter.rooms['room-' + socket.roomnum].host
            // If not host, recall it on host
            if (socket.id != host) {
                socket.broadcast.to(host).emit('getData')
            } else {
                socket.emit('syncHost')
            }
        }
    })

    // Emits the player status
    socket.on('player status', function(data) {
        // console.log(data);
        console.log(data)
    });

    // Change host
    socket.on('change host', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            console.log(io.sockets.adapter.rooms['room-' + socket.roomnum])
            var roomnum = data.room
            var newHost = socket.id
            var currHost = io.sockets.adapter.rooms['room-' + socket.roomnum].host

            // If socket is already the host!
            if (newHost != currHost) {
                console.log("I want to be the host and my socket id is: " + newHost);
                //console.log(io.sockets.adapter.rooms['room-' + socket.roomnum])

                // Broadcast to current host and set false
                socket.broadcast.to(currHost).emit('unSetHost')
                // Reset host
                io.sockets.adapter.rooms['room-' + socket.roomnum].host = newHost
                // Broadcast to new host and set true
                socket.emit('setHost')

                io.sockets.adapter.rooms['room-' + socket.roomnum].hostName = socket.username
                // Update host label in all sockets
                io.sockets.in("room-" + roomnum).emit('changeHostLabel', {
                    username: socket.username
                })
                // Notify alert
                socket.emit('notify alerts', {
                    alert: 1,
                    user: socket.username
                })
            }
        }
    })

    // Get host data
    socket.on('get host data', function(data) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var roomnum = data.room
            var host = io.sockets.adapter.rooms['room-' + roomnum].host

            // Broadcast to current host and set false
            // Call back not supported when broadcasting

            // Checks if it has the data, if not get the data and recursively call again
            if (data.currTime === undefined) {
                // Saves the original caller so the host can send back the data
                var caller = socket.id
                socket.broadcast.to(host).emit('getPlayerData', {
                    room: roomnum,
                    caller: caller
                })
            } else {
                var caller = data.caller
                // Call necessary function on the original caller
                socket.broadcast.to(caller).emit('compareHost', data);
            }
        }

    })

    // Calls notify functions
    socket.on('notify alerts', function(data) {
        var alert = data.alert
        console.log("entered notify alerts")
        var encodedUser = ""
        if (data.user) {
            encodedUser = data.user.replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        switch (alert) {
            // Enqueue alert
            case 0:
                var encodedTitle = ""
                if (data.title) {
                    encodedTitle = data.title.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }
                io.sockets.in("room-" + socket.roomnum).emit('enqueueNotify', {
                    user: encodedUser,
                    title: encodedTitle
                })
                break;
                // Host Change Alert
            case 1:
                io.sockets.in("room-" + socket.roomnum).emit('changeHostNotify', {
                    user: encodedUser
                })
                break;
                // Empty Queue Alert
            case 2:
                io.sockets.in("room-" + socket.roomnum).emit('emptyQueueNotify', {
                    user: encodedUser
                })
                break;
                // Beta Message Alert
            case 3:
                console.log("yoyoyoyoyo")
                io.sockets.in("room-" + socket.roomnum).emit('betaNotify', {})
                break;
            default:
                console.log("Error alert id")
        }
    })

    //------------------------------------------------------------------------------
    // Async get current time
    socket.on('auto sync', function(data) {
        var async = require("async");
        var http = require("http");

        //Delay of 5 seconds
        var delay = 5000;

        async.forever(

            function(next) {
                // Continuously update stream with data
                //var time = io.sockets.in("room-"+1).emit('getTime', {});
                //Store data in database
                //console.log(time);

                console.log("i am auto syncing")
                socket.emit('syncHost');

                //Repeat after the delay
                setTimeout(function() {
                    next();
                }, delay)
            },
            function(err) {
                console.error(err);
            }
        );
    });


    // Some update functions --------------------------------------------------
    // Update all users
    function updateUsernames() {
        // io.sockets.emit('get users', users);
        // console.log(users)
    }

    // Update the room usernames
    function updateRoomUsers(roomnum) {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var roomUsers = io.sockets.adapter.rooms['room-' + socket.roomnum].users
            io.sockets.in("room-" + roomnum).emit('get users', roomUsers)
        }
    }

    // Update the playlist/queue
    function updateQueueVideos() {
        if (io.sockets.adapter.rooms['room-' + socket.roomnum] !== undefined) {
            var vidlist = io.sockets.adapter.rooms['room-' + socket.roomnum].queue
            var currPlayer = io.sockets.adapter.rooms['room-' + socket.roomnum].currPlayer
            io.sockets.in("room-" + socket.roomnum).emit('get vidlist', {
                vidlist: vidlist,
                currPlayer: currPlayer,
            })
        }
    }

})












// io.sockets.on('connection', function (socket) {
// 
//   socket.emit('askForUserId');
// 
//   socket.on('userIdReceived', (userId) => {
//     sessionsMap[userId] = socket.id;
//     console.log(sessionsMap[userId])
//   });
//     // let setRoom;
// 
//     // const ioChat = io.of("/room" + "");
//     socket.on('join', function(room) {
//       socket.room = room;
//       socket.join(room);
//       // console.log(socket.join(room))
//       // console.log(room);
//     });
// 
//     socket.on('console', function(data){
//       console.log('test');
//     });
// 
// 
//     socket.on('adduser', function(username){
//     // store the username in the socket session for this client
//     socket.username = username;
//     var id = socket.id;
// 
// 
// 
// 
//     ids[id] = id;
//     // var username = socket.id;
//     // store the room name in the socket session for this client
//     // add the client's username to the global list
//     usernames[username] = username;
// 
// 
//     console.log(usernames)
// 
//     socket.emit('serverupdatechat', 'connected to room #' + '' + socket.room);
//     // echo to room 1 that a person has connected to their room
//     socket.broadcast.to(socket.room).emit('serverupdatechat', '' + socket.username + ' ' + 'joined the room');
//       io.in(socket.room).emit('updateusers', usernames, socket.id);
//     // console.log(usernames);
//       io.in(socket.room).emit('updaterooms', rooms, socket.room);
// 
//     // socket.broadcast.to(socket.room).emit('addname', socket.username);
// 
//     socket.on('connect', function(client) {
//         ids.splice(ids.indexOf(socket.id), 1);
// 
//         socket.on('disconnect', function() {
//           ids.splice(ids.indexOf(socket.id), 1);
//   });
// });

// console.log
// 
//     io.of('/').in(socket.room).clients((error, clients) => {
//     if (error) throw error;
  
    // Returns an array of client IDs like ["Anw2LatarvGVVXEIAAAD"]
    // console.log(clients); 
    // console.log(rooms);
    // socket.emit('clientlist', clients);
    // socket.emit('getusers',  '' + usernames);
  // });
    // console.log(socket.emit('getusers',  '' + usernames));
    // socket.on("set-room", function(room) {
    //   //leaving room.
    //   socket.leave(socket.room);
    //   //getting room data.
    //   //setting room and join.
    //   setRoom = function(roomId) {
    //     socket.room = roomId;
    //     console.log("roomId : " + socket.room);
    //     socket.join(socket.room);
    //     ioChat.to(usernames[socket.username]).emit("set-room", socket.room);
    //   };
    // });
    
    // socket.join(socket.room);
    // console.log(`${socket.id}`);
    // socket.on('private-message', function(data, message, userToPM) {
    //   io.to(userToPM).emit('updateprivchat', data, socket.username);
    //   console.log('private message event triggered');
    // });
    
    // socket.on("typing", function() {
    //   socket.to(socket.room).broadcast.emit("typing", socket.username + "  is typing...");
    // });
	  // when the client emits 'adduser', this listens and executes
		// send client to room 1
		// echo to client they've connected
	// });

	// when the client emits 'sendchat', this listens and executes
  // socket.on('sendchat', function (data) {
  		// we tell the client to execute 'updatechat' with 2 parameters
  	// 	io.in(socket.room).emit('updatechat', socket.username, data);
    //       console.log(usernames)
    //         console.log(ids)
  	// });
    
    // socket.on('sendurl', function (data) {
    // 		// we tell the client to execute 'updatechat' with 2 parameters
    // 		io.in(socket.room).emit('updateurl', socket.username, data);
    // 	});

	// socket.on('switchRoom', function(newroom){
	// 	// leave the current room (stored in session)
	// 	socket.leave(socket.room);
	// 	// join new room, received as function parameter
	// 	socket.join(newroom);
	// 	socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
	// 	// sent message to OLD room
	// 	socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username +' has left this room');
	// 	// update socket session room title
	// 	socket.room = newroom;
	// 	socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
	// 	socket.emit('updaterooms', rooms, newroom);
	// });

	// when the user disconnects.. perform this
	// socket.on('disconnect', function(){
  //   socket.broadcast.to(socket.room).emit('serverupdatechat', '' + socket.username + ' ' + 'left the room');
		// remove the username from global usernames list
		// update list of users in chat, client-side
		// echo globally that this client has left
		// socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
// 		socket.leave(socket.room);
//     delete usernames[socket.username];
//  	  io.in(socket.room).emit('updateusers', usernames);
// 	});
// });



// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use(express.static('/semantic'));

app.use(express.static('/libs/'));

// global variables

 
app.use(function(req, res, next) {
  isAuthenticated: req.isAuthenticated(),
  next()
});
//search user (for username/profile pics/db info)


//listen to port 3000
