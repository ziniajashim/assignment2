var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
  socket.on('play game', function(game){
    io.emit('play game', game);
  });
});
io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
  socket.broadcast.emit('new game');
});
http.listen(8080, function(){
  console.log('listening on *:8080');
});