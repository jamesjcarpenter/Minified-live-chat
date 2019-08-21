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
  var rooms = require("./models/roomschema");


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
