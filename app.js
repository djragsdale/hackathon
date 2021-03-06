﻿/**
 * Created by drags on 12/6/2014.
 */
// To stop node in Windows, use Ctrl+C

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var DEBUG = true;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.get('/win/:level/:username', function (req, res) {
    // expect current level and username
    var username = req.params.username;
    var level = req.params.level;
    console.log("User '" + username + "' just beat level " + level + ".");
    var socketId = "";
    if (socketIds[username]) {
        socketId = socketIds[username];
        io.to(socketId).emit('new level', {
            "level": level,
            "username": username
        });
        console.log(socketId);
    } else {
        console.log("User '" + username + "' failed trying to get socketId.");
    }
});
app.get('/fail/:level/:username', function (data) {
    // expect current level and username
    var username = req.params.username;
    var level = req.params.level;
    console.log("User '" + username + "' just failed level " + level + ".");
    var socketId = "";
    if (socketIds[username]) {
        socketId = socketIds[username];
        io.to(socketId).emit('level fail', level);
        console.log(socketId);
    } else {
        console.log("User '" + username + "' failed trying to get socketId.");
    }
});
app.use(express.static(__dirname + '/public'));

// What routing can I use for javascript files? Maybe /customjs?
// Then it can render the JS script text that is attached to the socket session?

// usernames which are currently connected to the game
var usernames = {};
var numUsers = 0;
// a dictionary of socketIds and usernames
var socketIds = {};

// Grab code from the game.html file
// Append my custom script elements
// Close body and html

var fs = require('fs');
var sandboxTop = "";
fs.readFile('public/game.html', function (err, data) {
    if (err) {
        console.log('!!! Error loading game.html.');
        throw err;
    }
    sandboxTop += data;
});

var moreSandbox = "<script src=\"https://code.jquery.com/jquery-1.10.2.min.js\"></script>\n";
//moreSandbox += "<script> var runMain = function () { console.log('Running sandbox script...'); ";
moreSandbox += "<script>";

//var sandboxBottom = "};</script>";
var sandboxBottom = "</script>";
sandboxBottom += "</body></html>";

io.on('connection', function (socket) {
    var addedUser = false;
    
    socket.on('join', function () {
        // Grab the userid here
        var haystack = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var username = "";
        for (var i = 0; i < 8; i++) {
            username += haystack.charAt(Math.floor(Math.random() * 52));
        }
        socket.username = username;
        usernames[username] = username;
        numUsers++;
        console.log("User " + username + " joined. There are now " + numUsers + " connected.");
        console.log("Socket.id for user '" + username + "' is '" + socket.id + "'.");
        socketIds[username] = socket.id;
        
        var html = sandboxTop;
        html += moreSandbox;
        html += sandboxBottom;
        var fs = require('fs');
        fs.writeFile('public/sandbox/' + socket.username + '.html', html);
        if (DEBUG) { console.log('Code submitted to public/sandbox/' + socket.username + '.html'); }
        socket.emit('joined', {
            file: socket.username + '.html',
            numUsers: numUsers
        });
    });
    
    // when the client emits 'submit code', this listens and executes
    socket.on('submit code', function (data) {
        var html = sandboxTop;
        html += moreSandbox;
        html += data;
        
        html += sandboxBottom;
        
        //attach script to socket
        //socket.script = data;
        // Forget thast, just write it to a freaking file.
        var fs = require('fs');
        fs.writeFile('public/sandbox/' + socket.username + '.html', html);
        
        if (DEBUG) { console.log('Code submitted to public/sandbox/' + socket.username + '.html'); }
        socket.emit('sandboxed', {
            file: socket.username + '.html'
        });
    });
    
    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (DEBUG) { console.log('User disconnected.'); }
        if (DEBUG) { console.log('Deleting sandbox for user ' + socket.username + '.') }
        //var newPath = __dirname + '/public/sandbox/' + socket.username + '.html';
        var newPath = 'public/sandbox/' + socket.username + '.html';
        var fs = require('fs');
        fs.unlink(newPath, function (err) {
            if (err) {
                console.log('!!! Error deleting ' + newPath + ' sandbox for user ' + socket.username + '.');
                console.log('!!! ' + err);
            }
        });
    });
});