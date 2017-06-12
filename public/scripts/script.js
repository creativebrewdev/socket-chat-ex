$(function(){
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', $('#nickname').val() + ': ' + $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg)); 
    }); 

    socket.on('newclientconnect', function(msg){
        $('#messages').append($('<li>').text(msg)); 
    });
});