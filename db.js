
var fs = require('fs');
var path = require('path');

function init(rootDir) {
	
	var rootDir = rootDir;
	
	function errorHandler(req, res, statusCode, message) {
		res.statusCode = statusCode;
		res.end(message);
	}
	
	function handler(req, res, pathname, body) {
		
		var filePath = __dirname + path.sep + rootDir + path.sep + pathname.join(path.sep);
		
		switch (req.method) {
			case 'PUT':
				fs.stat(filePath, function (err, stats) { 
					if (err || stats.isFile()) {
						fs.writeFile(filePath, JSON.stringify(body), function (err) {
							if (err) {
								console.log(err);
								errorHandler(req, res, 403, 'Forbidden');
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
								res.end(data, 'utf8');
							}
						});
					}
				})
				
				break;
			
			default: 
			
		}
		
	
	}
	
	return handler;
}



module.exports = {init: init};