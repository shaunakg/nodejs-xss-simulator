
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;
const readline = require('readline');

app.get('/', function(req, res){
    console.log("New request to index.html");
    res.sendFile(__dirname + '/index.html');
});

app.get('/stylesheet.css', function(req, res){
    res.sendFile(__dirname + '/stylesheet.css', headers = {
        'Content-Type' : 'text/css'
    });
});

app.get('/jquery-1.11.1.js', function(req, res){
    res.sendFile(__dirname + '/jquery-1.11.1.js');
});

io.on('connection', function(socket){

    socket.on('ctfc', function(new_text) {
        socket.broadcast.emit('stfc', new_text);
    });

});

http.listen(PORT, function(){
    console.log('listening on *:' + PORT);
})