
// Welcome to the XSS Simulator's source code
// Author: @shaunakg
// Repository: https://github.com/shaunakg/nodejs-xss-simulator
// Created: 16th October 2019

// Get dependencies
// Express: HTTP server
// Socket: live client-server-client messaging

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;
var current_text = "";

// Tell Express what to serve
// Index page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// Stylesheet
app.get('/stylesheet.css', function(req, res){
    res.sendFile(__dirname + '/stylesheet.css', headers = {
        'Content-Type' : 'text/css'
    });
});

app.get("/connection_script.js", (req, res) => {
    res.sendFile(__dirname + "/connection_script.js");
});

// Reset function (unsecured)
app.get('/reset', function (req, res) {
    res.send('--- XSS SIMULATOR API ---<br>Sent empty server page update.');
    io.emit('stfc', "[The server was manually reset]");
});

// On connection
io.on('connection', function(socket){

    // When Socket recieves a 'ctfc' message (Client Text Field ????)
    socket.on('ctfc', function(new_text) {

        // Update a variable to the new text
        current_text = new_text;

        // Emit it to all users as a 'stfc' message (Server Text Field ????)
        socket.broadcast.emit('stfc', current_text);

    });

});

// Listen for connections
http.listen(PORT, function(){
    console.log('listening on *:' + PORT);
})
