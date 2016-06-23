var express = require('express');


var httpStub = '<!DOCTYPE html><html>'+
	'<head><title>Biobanque</title></head>' +
	'<body><script src="app/main.js"></script></body>'+
	'<html>';

var app = express();



app.get('/', function (req, res) { res.send(httpStub);});
app.use('/app', express.static('app', {fallthrough: false}));

app.listen(2000);

// function () {}

// users
// form
// patients