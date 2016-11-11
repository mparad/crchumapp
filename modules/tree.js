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
					'font': '12px monospace',
					'white-space': 'pre'
				},
				'input': {
					'padding': '0px',
					'margin-left': '5px',
					'height': '12px',
					'width': '150px'
				},
				'select': {
					'border': 'none',
					'font': '12px monospace',
					'white-space': 'pre'
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
					children: specs.label ? [obj.label, obj.line] : [obj.line]	
				});
				
				obj.coll = new html.element({
					tag: 'vdiv',
					children: []
				});
				
				obj.collContainer = new html.element({
					tag: 'vdiv',
					children: [obj.coll]
				});
				
				obj.right = new html.element({
					tag: 'vdiv',
					children: [obj.header, obj.collContainer]
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
				
				obj.menu = specs.menu;
				
				if (obj.menu) {
					obj.coll.style({
						position: 'absolute',
						'z-index': obj.menu + '',
						'background-color': '#FFFFFF'
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
					obj.right.add(obj.collContainer);
					if (obj.menu) {
						obj.coll.style({
							'border': '1px solid black',
							'border-top': 'none',
							'padding-right': '5px',
							'padding-bottom': '5px'
							});
					}
						
					obj.folded = false;
				}
			}	
				
			node.prototype.fold = function() {
				var obj = this;
				if (!obj.folded) {
					obj.foldButton.value(obj.coll.children().length === 0 ? '' : '+');
					obj.right.remove(obj.collContainer);
					if (obj.menu) {
						obj.coll.style({'border': 'none'});
					}
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





