// var express = require('express');


// var httpStub = '<!DOCTYPE html><html>'+
	// '<head><title>Biobanque</title>' +
	// '<script src="app/modules.js"></script>' + 
	// '<script src="app/main.js"></script>' + 
	// '</head>' +
	// '<body></body>'+
	// '<html>';

// var app = express();



// app.get('/', function (req, res) { res.send(httpStub);});
// app.use('/app', express.static('app', {fallthrough: false}));

// app.listen(2000);

// // function () {}

// // users
// // form
// // patients

var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

function handler(req, res) {
	var pathname = url.parse(req.url).pathname.split('/').filter(function (subs) {
		return subs !== '';
	});
	var body = [];
	req.on('data', function(dataPart) {
		body.push(dataPart);
	});
	req.on('error', function() {
		errorHandler(req, res, 500, 'Connection Error');
	});
	req.on('end', function() {
		body = Buffer.concat(body).toString();
		RESTHandler(req, res, pathname, RESTArchitecture, body);
	});
}

function stringHandler(req, res, str) {
	if (req.method.toLowerCase() == 'get') {
		res.statusCode = 200;
		res.end(str);
	} else {
		errorHandler(req, res, 405, 'Method Not Allowed : ' + req.method + req.url);
	}
}

function errorHandler(req, res, statusCode,message) {
	res.statusCode = statusCode;
	res.end(message);
}

function RESTHandler(req, res, pathname, arch, body) {
	var firstPathElement = pathname.length > 0 ? pathname[0] : 'index';
	if (arch[firstPathElement]) {
		if (typeof arch[firstPathElement] === 'function') {
			arch[firstPathElement](req, res, pathname.slice(1), body);
		} else if (typeof arch[firstPathElement] === 'string') {
			stringHandler(req, res, arch[firstPathElement]);
		} else {
			RESTHandler(req, res, pathname.slice(1), arch[firstPathElement], body)
		}
	} else {
		errorHandler(req, res, 404, 'Resource not found : ' + req.url);
	}
}

function staticHandler(rootDir) {
	return function(req, res, pathname, body) {
		var filePath = __dirname + path.sep + rootDir + path.sep + pathname.join(path.sep);
		fs.readFile(filePath, 'utf8', function (err, data) {
			if (err) {
				errorHandler(req, res, 404, 'File Not Found : ' + req.url);
			} else {
				res.statusCode = 200;
				res.end(data, 'utf8');
			}
		});
	}
}

function dbHandler() {};

var httpStub = '<!DOCTYPE html><html>'+
	'<head><meta charset="utf-8"/><title>Biobanque</title>' +
	'<script src="app/modules.js"></script>' + 
	'<script src="app/main.js"></script>' + 
	'</head>' +
	'<body></body>'+
	'<html>';

var RESTArchitecture = {
	index: httpStub,
	app: staticHandler('app'), 
	db: dbHandler
	
	
}

var server = http.createServer(handler);

server.listen(2000);































