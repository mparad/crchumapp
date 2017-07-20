
var fs = require('fs');
var path = require('path');
var enc = require('./encryption.js');


function init(rootDir, auth) {
	
	var rootDir = rootDir;
	
	function errorHandler(req, res, statusCode, message) {
		//throw new Error(statusCode + message);
		res.statusCode = statusCode;
		res.end(message);
	}
	
	function handler(req, res, pathname, body) {
		 
		// console.log(req.method);
		// console.log(req.url);
		// console.log(req.headers.token);
		// console.log(auth.session());
		
		var token = req.headers.token;
		
		if (token && auth.session()[token]) {
			
			var filePath = __dirname + path.sep + rootDir + path.sep + pathname.join(path.sep);			
			var dbpwd = enc.decrypt(auth.session()[token].dbkey, 
			auth.session()[token].pwdkey );
			
			switch (req.method) {
				case 'PUT':
					fs.stat(filePath, function (err, stats) { 
						if (err || stats.isFile()) {
							fs.writeFile(filePath, enc.encrypt(JSON.stringify(body), dbpwd), 				function (err) {
									if (err) {
										errorHandler(req, res, 403, 'Forbiden');
									} else {
										res.statusCode = 200;
										res.end('', 'utf8');
									}
								});
						} else {
							errorHandler(req, res, 403, 'Forbidden : ' + req.url);
						}	
					});			
					break;
					
				case 'GET':
					fs.stat(filePath, function (err, stats) { 
						if (err) {
							errorHandler(req, res, 404, 'File Not Found : ' + req.url);
						} else if (stats.isDirectory()) {
							fs.readdir(filePath, 'utf8', function (err, data) {
								if (err) {
									errorHandler(req, res, 404, 'File Not Found : ' + req.url);
								} else {
									res.statusCode = 200;
									res.end(JSON.stringify(data), 'utf8');
								}
							});
							
						} else {
							fs.readFile(filePath, 'utf8', function (err, data) {
								if (err) {
									errorHandler(req, res, 404, 'File Not Found : ' + req.url);
								} else {
									res.statusCode = 200;
									res.end(enc.decrypt(data, dbpwd), 'utf8');
								}
							});
						}
					})					
					break;
					
				default: 
			}
		} else {
			errorHandler(req, res, 403, 'Forbidden : ' + req.url);
		}
	}
	return handler;
}



module.exports = {init: init};