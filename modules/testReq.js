(function() {
	var root = this;
	root.onload = function() {
		_modules.ref(['html', 'req'], 
			function (html, req) {
				
				var rootDiv = html.create({
					tag: 'div',
					style: {
						font: '15px sans-serif'
					}
				}, html.root);
				
				var htmlObj = html.create({
					tag: 'div',
					children: 'This is it',
				}, rootDiv);
				
				function handleResponse(responseObject){
					html.create({
						tag: 'div',
						children: responseObject.response,
					}, rootDiv);
				}
				
				function handleError(errorObject){
					console.log(errorObject);
				}
				
				req({
					method: 'GET', 
					url: '/test',
					next: handleResponse,
					err: handleError
					
				});
				
				
				
		
			}
		);
	}
}.call(this));


