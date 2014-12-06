/**
 * Created by hester on 12/6/2014.
 */
var express = require('express');

var env  = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/'));
app.set('views', __dirname | '/server/views');

app.get('*', function(req, res) {
    res.render('index');
});

var port = 3030;
app.listen(port);
console.log('listening on port: ' + port + '...');