(function () {
	_modules.ref(['html', 'tree', 'req'], 
		function (html, tree, req) {
			
			function init(session) {
			
				var appNodes = [];
			
				var userTitle = new html.element({tag: 'textDiv', value: ''});
					
				var userInfoPanel = new tree.node({
					label: '',
					line: [userTitle],
					coll: [
						new html.element({
							tag: 'button', 
							onclick: function (){
								logout();							
							},
							value: 'Fermer la session'
						})
					]				
				})
				
				userInfoPanel.fold();
				
				var loginInput = new html.element({tag: 'input'});
				var pwdInput = new html.element({tag: 'input'});
				
				var loginNode = new tree.node({
					label: 'Ouvrir la session',
					coll: [
						new html.element({
							tag: 'hdiv', 
							style: {
							'justify-content': 'space-between'
							},
							children: [
								new html.element({tag: 'textDiv', value: 'Identifiant  '}),
								loginInput
							]}),
						new html.element({
							tag: 'hdiv', 
							style: {
								'justify-content': 'space-between'
							},
							children: [
								new html.element({tag: 'textDiv', value: 'Mot de passe'}),
								pwdInput
							]}),
						new html.element({
							tag: 'button', 
							onclick: function (){
								loginReq(loginInput.value(), pwdInput.value());							
							},
							value: 'Valider'
						}),
					]					
				})
				
				loginNode.fold();
				
				function logout() {
					if (session.token) {
						appNodes.forEach(function(app){
							userNode.coll.remove(app);
						});
						appNodes = [];
						userInfoPanel.fold();
						userNode.line.replace(loginNode, userInfoPanel);
						userNode.fold();
					} 
					loginInput.value('');
					pwdInput.value('');
					session = {};
				}
				
				function login(){
					if (session.token) {
						userTitle.value(session.userinfo.fullname);
						loginNode.fold();
						userNode.line.replace(userInfoPanel, loginNode);
						appNodes = [];
						
						session.apps.forEach(function(app){
							_modules.ref([app], 
								function (init) {
									console.log('INITSEP')
									var appObject = init(session);
									appNodes.push(appObject);
									userNode.coll.add(appObject);
									appObject.fold();
								}
							);							
						});
						userNode.unfold();
					}
				}
				
				function loginReq(username, pwd) {
					req({
						method: 'POST', 
						url: 'login',
						data: {
							username: username,
							pwd: pwd
						},
						next: function(response) {
							if (response.data && response.data.token) {
								session.token = response.data.token;
								session.userinfo = response.data.userinfo;
								session.apps = response.data.apps;
								login();
							} else {
								logout();
							}
							
						},
						err: function(msg) {
							logout();
						}
					});
				}
				
				var userNode = new tree.node({
					root: true,
					label: 'Usager', 				
					line: [loginNode],
					// coll: [
						// //new html.element({tag: 'textDiv', value: 'Important text'}), 
						// new tree.node({
							// label: 'Usager',
							// coll: [
								// new html.element({tag: 'textDiv', value: 'Boaz Lahav'}), 
							// ]
						// })
					// ]					
				});	
				
			}
			_modules.add('user', init);
			
		}
	)
})();
			
			
			