(function() {
	var root = this;
	root.onload = function() {
		_modules.ref(['tree', 'html', 'user'], 
			function (tree, html, user ) {
				
				var title = new html.element({
					tag: 'textDiv', 
					root: true,
					value: 'Biobanque CHUM',
					style: {
						'font': '25px monospace',
						'margin-bottom': '20px'
					}
				});
				
				var userApp = user();
						
			}
		);
	}
}.call(this));


