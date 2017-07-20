var Hashids = require('./hashids.js');

var project = 'biobanquechum2016';

var hashids = new Hashids(project, 12, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
	
function encodeRamq(str) {
	upperCaseRamq = str.toUpperCase();
	nums = [
		(upperCaseRamq.charCodeAt(0) - 65) + (upperCaseRamq.charCodeAt(1) - 65) * 100,
		(upperCaseRamq.charCodeAt(2) - 65) + (upperCaseRamq.charCodeAt(3) - 65) * 100,
		parseInt(upperCaseRamq.substr(5, 8))
	];
	//console.log(nums)
	return hashids.encode(nums);
	
}	
	
function handler(req, res, pathname, body){
	var ramq = body.ramq;
	if (typeof ramq != 'string' || ramq.length != 12) {
		res.statusCode = 400;
		res.end('Invalid RAMQ code: ' + body);
	} else {
		res.statusCode = 200;
		res.end(JSON.stringify({ramqId: encodeRamq(ramq)}));
	}
}

module.exports = {handler: handler};
