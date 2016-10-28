var server = require('./server.js');

var httpStub = '<!DOCTYPE html><html>'+
	'<head><meta charset="utf-8"/><title>Biobanque</title>' +
	'<script src="app/modules.js"></script>' + 
	'<script src="app/main.js"></script>' + 
	'</head>' +
	'<body></body>'+
	'<html>';

server.start(2000, {
	index: httpStub,
	app: server.fs('app'), 
	db: null
});		