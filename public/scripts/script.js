$(function(){
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', $('#nickname').val() + ': ' + $('#m').val());
        $('#m').val('');
        return false;
    });
    $('#m').focus(function(){
            socket.emit('is typing', $('#nickname').val() + ' is typing...');       
    })

    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg)); 
    }); 

    socket.on('is typing', function(msg){
        $('#messages').append($('<li>').text(msg));
    })

    socket.on('newclientconnect', function(msg){
        $('#messages').append($('<li>').text(msg)); 
    });
});