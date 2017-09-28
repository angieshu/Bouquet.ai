var express = require('express');
var https = require('https');
var path = require('path');
var app = express();

app.get('/buildChart.js',function(req,res){
	res.sendFile(path.join(__dirname + '/buildChart.js'));
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', function(req, res) {
	res.redirect('/index.html');
});

app.listen(8080);
console.log("Listening on Port 8080");
