var express = require('express');
var https = require('https');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/buildChart.js',function(req,res){
	res.sendFile(path.join(__dirname + '/buildChart.js'));
});

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
