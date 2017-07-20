(function () {

	function init() {
		
		var session = {};

		function req(cmd, obj){
			
			switch (cmd) {
				case 'send':
					var method = obj.method ? obj.method : 'GET';
					
					if (!obj.url) {
						throw new Error('req: missing url parameter : ' + obj);
					} 
					
					if (!obj.next) {
						throw new Error('req: missing next parameter : ' + obj);
					} 
					
					if (!obj.err) {
						throw new Error('req: missing error parameter : ' + obj);
					} 
					
					var reqObj = new XMLHttpRequest();
					if (obj.timeout) {
						reqObj.timeoout = obj.timeout;
						reqObj.ontimeout = function() {obj.err('req: timeout');}
					}
					
					reqObj.onload = function() {
						if (reqObj.readyState === 4) {
							if (reqObj.status === 200) {
								var responseText = reqObj.responseText;
								responseText = responseText ? JSON.parse(responseText) : '';
								reqObj.data = responseText;
								return obj.next(reqObj);
							} else {
								return obj.err(reqObj.statusText);
							}
						}
					}
					
					reqObj.onerror = function(err) {
						obj.err(err);
					}
					
					reqObj.open(method, obj.url, true);
					if (session.token) {
						reqObj.setRequestHeader('token', session.token);
					}
					reqObj.send(JSON.stringify(obj.data));
				
					break;
				case 'login':
					session = obj;
					break;
				case 'logout':
					session = {};
					break;
				case 'session':
					return session;
					break;
				default:
			}
		}
		
		return req;
		
	}
	
	_modules.add('req', init());
	
})();





