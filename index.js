var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});