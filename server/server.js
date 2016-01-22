'use strict'
var express = require('express');
var app = express();
var Routes = require('./Routes.js');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Config = require('./Config.js');
// app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/test', function(request, response){
  response.send("Hello World");
});
app.use("/", express.static(__dirname + '/public'));

var routes = new Routes(app, io, new Config());
routes.initializeRoutes();

var server = http.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`My Sweet GPS Tracker listening ${host} : ${port}`);
});
