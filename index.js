var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var generate_name = require('sillyname');

app.get('/', function(req, res) {
  console.log("I got a hit!");
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  var user_name = generate_name(); // implement cookies soon
  console.log("user " + user_name + " connected!");
  io.emit('user_connect', user_name); // "connect" doesn't work?
  
  socket.on('disconnect', function() {
    console.log("user " + user_name + " disconnected...");
    io.emit('disconnect', user_name)
  });

  socket.on('chat message', function(msg) {
    console.log("message: " + msg);
    io.emit('chat message', user_name, msg);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});