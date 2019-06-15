var express= require('express');
const app=express();
var http = require('http').Server(app);
var io=require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});
io.on('connection',function(){
    console.log('User connected')
    Socket.on('disconnect',function(){
        console.log('User disconnected');
    })
})
http.listen(3000, function() {
   console.log('listening on :3000');
});
