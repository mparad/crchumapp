var enc = require('./encryption.js');

var users = {
	temp: {
		userinfo: {
			fullname: 'Usager temporaire'
		},
		pwd: '0ld077QnLjp14K4ttnf0+XhbiKf8viAYFffXphdsMeE=',
		dbkey: '5zOuwMa32SK5VDLoCgzv/u7KvrX+gnNmfoMhJPgMe7wMxM7O9f1ukexRoVb0QNcT=',
		groups: ['admin'],
		apps: ['sep']
	}
};

var _session = {};

function login(req, res, pathname, body){
	
	function err() {
		_session = {};
		res.statusCode = 200;
		res.end(JSON.stringify({token: null}));
	}
	
	switch (req.method){
		case 'POST':
			if (users[body.username] && enc.getPwdHash(body.pwd) == users[body.username].pwd) {
				var token = Math.floor(Math.random()* 100000000).toString();
				_session[token] = users[body.username];
				_session[token].pwdkey = enc.getPwdKey(body.pwd);
				res.statusCode = 200;
				res.end(JSON.stringify({
					userinfo: users[body.username].userinfo,
					token: token,
					apps: users[body.username].apps
				}));
			} else {
				err();
			}
			
			break;
		default:
			err();
			break;
	}
}

function session() {
	return _session;
} 

module.exports = {
	session: session, 
	login: login
}