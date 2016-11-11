
var users = {
	adm: {
		token: 166,
		userinfo: {
			fullname: 'Admin'
		},
		pwd: '',
		groups: ['admin'],
		apps: ['sep']
	},
	blahav: {
		token: 120,
		userinfo: {
			fullname: 'Boaz Lahav',
		},
		pwd: '47dj47dj',
		groups: ['med'],
		apps: ['sep']
	},
	clarochelle: {
		token: 110,
		userinfo: {
			fullname: 'Catherine Larochelle'
		},
		pwd: 'fffff',
		groups: ['med'],
		apps: ['sep']
	},
	admin: {
		token: 1100,
		userinfo: {
			fullname: 'Administrateur',
		},
		pwd: 'admin',
		groups: ['admin'],
		apps: ['sep']
	}
};

function login(req, res, pathname, body){
	
	function err() {
		res.statusCode = 200;
		res.end(JSON.stringify({token: null}));
	}
	
	switch (req.method){
		case 'POST':
			if (users[body.username] && body.pwd == users[body.username].pwd) {
				res.statusCode = 200;
				res.end(JSON.stringify({
					userinfo: users[body.username].userinfo,
					token: users[body.username].token,
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

module.exports = login;