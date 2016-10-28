(function () {
	_modules.ref(['html', 'req'], 
		function (html, req) {
				
			html.style({
				 'button': { 
					 'border': '1px',
					// 'margin-top': '1px',
					 'margin-left': '2px',
					 'height': '16px',
					 'min-width': '16px',
					 'background-color': '#DDDDDD',
					 'padding': '0px 4px 0px 4px',
					 'font': '1em monospace',
					// 'text-align': 'center',
				 }, 
				'div': {
					'font': '12px sans-serif',
				},
				'input': {
					'padding': '0px',
					'margin-left': '5px',
					'height': '12px',
					'width': '150px'
				},
				'select': {
					'border': 'none'
				},
				'.hdiv': {
					display: 'flex', 
					'flex-direction': 'row'
				},
				'.vdiv': {
					display: 'flex', 
					'flex-direction': 'column'
				},
				'.textDiv': {
					// 'margin-top': '10px',
					'margin-left': '4px',
					'height': '18px'
				}
			});
				
				
			function node(specs){
				var obj = this;
				
				obj.left = 50;
				obj.folded = false;
				
				obj.foldButton = new html.element({
					tag: 'button', 
					value: '-',
					onclick: function(){
						obj.toggle();
					}					
				});
				
				obj.left = new html.element({
					tag: 'hdiv',
					style: {
						'margin-right': '3px',
						'margin-left': '3px'
					},
					children: [obj.foldButton]				
				});
				
				obj.label = new html.element({
					tag: 'textDiv', 
					value: specs.label || ''
				});
				
				obj.line = new html.element({
					tag: 'hdiv',
					children: []				
				});
				
				obj.header = new html.element({
					tag: 'hdiv',
					children: [obj.label, obj.line]				
				});
				
				obj.coll = new html.element({
					tag: 'vdiv',
					children: []
				});
				
				obj.right = new html.element({
					tag: 'vdiv',
					children: [obj.header, obj.coll]
				});
				
				obj.main = new html.element({
					tag: 'hdiv',
					root: specs.root,
					children: [obj.left, obj.right]
				});
				
				obj._dom = obj.main._dom;
				
				if (specs.line) {
					specs.line.forEach(function(lineItem){
						obj.line.add(lineItem);
					});
				}
				
				if (specs.coll) {
					specs.coll.forEach(function(collItem){
						obj.coll.add(collItem);
					});
				}
				
				obj.fold();
				
				return obj;
			}
				
			// node.prototype = Object.create(html.element.prototype);
			// node.prototype.constructor = node;	
				
			node.prototype.unfold = function() {
				var obj = this;
				if (obj.folded) {
					obj.foldButton.value(obj.coll.children().length === 0 ? '' : '-');
					obj.right.add(obj.coll);
					obj.folded = false;
				}
			}	
				
			node.prototype.fold = function() {
				var obj = this;
				if (!obj.folded) {
					obj.foldButton.value(obj.coll.children().length === 0 ? '' : '+');
					obj.right.remove(obj.coll);
					obj.folded = true;
				}
			}
	
			node.prototype.toggle = function() {
				var obj = this;
				if (obj.folded) {
					obj.unfold();
				} else {
					obj.fold();
				}
			}
	
	
			_modules.add('tree', {
				node: node
			});
			
		}
	);
})();

/*

new tree.node()



*/





