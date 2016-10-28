var server = require('./server.js');
var login = require('./login.js');
var db = require('./db.js');

var httpStub = '<!DOCTYPE html><html>'+
	'<head><meta charset="utf-8"/><title>Test CSS</title>' +
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
	
server.start(2002, {
	index: httpStub,
	modules: server.fs('modules'), 
	login: login,
	test: testResponseData,
	db: db.init('db')
});		

/*
function el(a) {	
	this.b = a;
}

el.prototype.getb = function(){
	console.log(this.b);
}

var g = new el(23);
g.getb();


function elb(b) {
	var c = 100;
	
	el.call(this, b);
	
}

elb.prototype = Object.create(el.prototype);

var h = new elb(99);

h.getb();*/