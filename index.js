
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;
const readline = require('readline');
var current_text = "";

app.get('/', function(req, res){
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

app.get('/reset', function (req, res) {
    res.send('--- XSS SIMULATOR API ---\nSent empty server page update. This option is now locked for 1 minute.');
    io.broadcast.emit('stfc', current_text);
});

io.on('connection', function(socket){

    socket.on('ctfc', function(new_text) {
        current_text = new_text;
        socket.broadcast.emit('stfc', current_text);
    });

});

http.listen(PORT, function(){
    console.log('listening on *:' + PORT);
})