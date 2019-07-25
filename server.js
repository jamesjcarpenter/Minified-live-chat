const express = require('express');
const helmet = require('helmet')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();



//TO DO: ADD RATE LIMITER TO PROTECT LOGINS AND DDOS
app.use(bodyParser.json());
// configure passport
require('./config/passport')(passport);

app.get('/register', function(req, res){
 res.sendFile("register.html"); //if html file is within public directory
});

app.get('/login', function(req, res){
 res.sendFile("login.html"); //if html file is within public directory
});

//middleware parser
app.use(bodyParser.urlencoded({
  extended: false
}))

//helmet is good for express security
app.use(helmet())


//set port to 3000
const port = 3000;


// this sets the port as 3000 for localhost. node.js environment as production. session name & secret (defined by user's cookie)
const {
  PORT = 3000,
  NODE_ENV = 'development',
  
  SESS_NAME = "sid",
  SESS_SECRET = "t0aAzDtHq"
} = process.env
const IN_PROD = NODE_ENV === 'production'



// Set public folder as root
app.use(express.static('public'));

// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use('/semantic', express.static(`${__dirname}/semantic/`));

// TODO: database. mongodb.


//listen to port 3000
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info('listening on %d', port);
});


app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html'); //if html file is within public directory
});

app.get('/', function(req, res){
 res.sendFile(__dirname + '/home.html'); //if html file is within public directory
});
app.post('/home',function(req,res){
   var username = req.body.username;
   var htmlData = 'Hello:' + username;
   res.sendFile(__dirname + '/index.html');
   console.log(htmlData);
});

app.post('/',function(req,res){
   var username = req.body.username;
   var htmlData = 'Hello:' + username;
   res.sendFile(__dirname + '/index.html');
   console.log(htmlData);
});


//begin passport session
app.use(passport.initialize());
app.use(passport.session());
  
  //require auth script for registration/login. user script for schema.
  app.use('/', require('./routes/index.js'));
  app.use('/users', require('./routes/users.js'));

// '/' = default.
//app.get('/', (req, res) => {
//  const { userId } = req.session 
  //TO DO: show login/register only if not logged in
//});


//express session start options:

// secure = HTTPs secure. needs to be on before deployment.
app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  httpOnly: true,
  cookie:{maxAge:60000},
    sameSite: true,
    secure: IN_PROD
}))
