var mongoose = require('mongoose');
const db = require('./config/keys').MongoURI;

mongoose.connect(db);

var conn = mongoose.connection;

var room = {
    a: 'abc'
};

conn.collection('aaa').insert(rooms);

console.log('rooms: ');
console.log(room);
