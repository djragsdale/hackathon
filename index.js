/**
 * Created by drags on 12/6/2014.
 */
// To stop node in Windows, use Ctrl+C

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 63342;
var DEBUG = true;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
    console.log('__dirname is ' + __dirname);
});

// Routing
app.use(express.static(__dirname + '/public'));

// usernames which are currently connected to the game
var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {

    // when the client emits 'submit code', this listens and executes
    socket.on('submit code', function (data) {
        //
        if (DEBUG) { console.log('Code submitted.') }
        socket.emit('sandbox', {
            script: data
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (DEBUG) { console.log('User disconnected.'); }
    });
});