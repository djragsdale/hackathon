/**
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
app.get('/customjs.js', function (req, res) {
    var fs = require('fs');
    var script = "";
    //fs.open('customjs.js');
    fs.readFile('customjs.js', "utf-8", function (err, data) {
        if (err) throw err;
        if (DEBUG) { console.log(data); }
        script = data;
    });
    //fs.close();
    res.send(script);
});
console.log('js route complete');
//app.use('/sandbox', express.static(__dirname + 'public/sandbox'));

//app.get('/sandbox', function (req, res) {
    //var html = "<html><head></head><body>";
    //html += "<span id=\"alert\">nothing</span>";
    //html += "<canvas id=\"game\"></canvas>";
    //html += "<script src=\"https://code.jquery.com/jquery-1.10.2.min.js\"></script>";
    //html += "<script>";
    //html += "function main() { document.getElementById('alert').innerText = 'test' }";
    //html += "";
    //html += "</script>";
    //html += "</body></html>";
    //res.send(html);
//  res.send(express.static(__dirname + '/public/sandbox.html'));
//});
app.use(express.static(__dirname + '/public'));
//app.use('/', function (req, res) {
//    res.send(express.static(__dirname + '/public'));
//});
//console.log('main route complete');

// What routing can I use for javascript files? Maybe /customjs?
// Then it can render the JS script text that is attached to the socket session?

// usernames which are currently connected to the game
var usernames = {};
var numUsers = 0;

var htmlTop = "<html><head></head><body>";
htmlTop += "<span id=\"alert0\">nothing</span>";
htmlTop += "<span id=\"alert1\">nothing</span>";
htmlTop += "<span id=\"alert2\">nothing</span>";
htmlTop += "<span id=\"alert3\">nothing</span>";
htmlTop += "<canvas id=\"game\"></canvas>";
htmlTop += "<script src=\"https://code.jquery.com/jquery-1.10.2.min.js\"></script>";
htmlTop += "<script>";

var htmlBottom = "</script>";
htmlBottom += "</body></html>";

io.on('connection', function (socket) {
    var addedUser = false;
    
    socket.on('join', function () {
        var haystack = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var username = "";
        for (var i = 0; i < 8; i++) {
            username += haystack.charAt(Math.floor(Math.random() * 52));
        }
        socket.username = username;
        usernames[username] = username;
        numUsers++;
        console.log("User " + username + " joined. There are now " + numUsers + " connected.");

        var html = htmlTop;
        html += htmlBottom;
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
        var html = htmlTop;
        html += data;
        html += htmlBottom;

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
    });
});