(function() {
	var root = this;
	root.onload = function() {
		_modules.ref(['graphics'], 
			function (gx) {
				
				function create(obj, parent) {
					var domObj = obj;
					var nodeType;
					if (typeof obj === 'string') {
						domObj = document.createTextNode(obj);
					} else if (obj.tag) {
						domObj = document.createElement(obj.tag);
						Object.keys(obj).forEach(function (param) {
							switch (param) {
								case 'tag':
									break;
								case 'children':
									if (typeof obj[param] === 'string') {
										create(obj[param], domObj);
									} else {
										obj[param].forEach(function (childObj) {
											childDomObj = create(childObj, domObj);
										});
									}
									break;
								case 'style':
									Object.keys(obj.style).forEach(function(styleParam){
										domObj.style[styleParam] = obj.style[styleParam];
									});
									break;
								default:
									domObj[param] = obj[param];
									break;
							}
						});
					} 
					if (parent) {
						parent.appendChild(domObj);
					}
					return domObj;
				}
			
				function handleLogin(evt){
					ident.nodeValue = login.value + pwd.value;
				}
			
				var login = create({
					tag: 'input',
					onkeyup: handleLogin
				});
				
				var pwd = create({
					tag: 'input',
					type: 'password',
					onkeyup: handleLogin
				});
				
				var ident = create('Unregistered');
				
				create({
					tag: 'div',
					style: {
						display: 'flex',
						'flex-direction': 'column'
					},
					children: [login, pwd, ident]
					}, document.body
				);
				
			}
		);
	}
}.call(this));





























