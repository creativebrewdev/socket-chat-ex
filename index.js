var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

var users = 0;

io.on('connection', function(socket){
    users++;
    socket.emit('newclientconnect', 'Hey, Welcome!');
    socket.broadcast.emit('newclientconnect', 
        'A user has joined the chat. (' + users + ' connected)');
    
    console.log(users + ' connected.');

    socket.on('disconnect', function(){
        users--;
        io.emit('chat message', 'A user has left the chat. (' + users + ' connected)');
        console.log(users + ' connected.');
    });
    
    socket.on('chat message', function(msg){
        socket.emit('chat message', '>>>' + msg);
        socket.broadcast.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});