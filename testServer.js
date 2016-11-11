var process = require('process');
var server = require('./server.js');
var login = require('./login.js');
var db = require('./db.js');
var ramq = require('./ramq.js');

var httpStub = '<!DOCTYPE html><html>'+
	'<head><meta charset="utf-8"/><title>Biobanque CHUM</title>' +
	'<script src="modules/modules.js"></script>' + 
	'<script src="modules/main.js"></script>' + 
	'</head>' +
	'<body></body>'+
	'<html>';

var testResponseData = 'XXXXXXXWWWWWWWW';	
	
function errorRedirect() {
	
} 
	
function handleLogin(req, res, pathname, body) {
	
	
}	
	

	
var args = process.argv;

try {
	if (args.length < 3) {
		port = 80;
	} else {
		port = parseInt(args[2]);
		if (!(0 < port < 10000)) {
			throw new Error('Invalid port argument: ' + args[2]);
		}
	}
	server.start(port, {
		index: httpStub,
		modules: server.fs('modules'), 
		login: login,
		test: testResponseData,
		db: db.init('dbtest'),
		ramq: ramq.handler
	});		
	console.log('Biobanque server started on port ' + port);
} catch (err) {
	throw new Error('Invalid port argument: ' + args[2]);
}


	

