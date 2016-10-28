(function() {
	var root = this;
	 
	root.onload = function() {
		_modules.ref([
		'graphics'], 
		function (gx) {
			
			//console.log(gx);
			
			function create(obj, parent) {
				var domObj;
				var nodeType;
				if (typeof obj === 'string') {
					domObj = document.createTextNode(obj);
				} else {
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
	
			var fl = {	
				tag: 'div',
				className: 'c',
				children: [{	
						tag: 'label',
						children: 'Label' 
					},
					'Text', 
					{ 
						tag: 'button', 
						children: 'Button' 
					}
				]
			};
	
		var main = create({ 
			tag: 'div', 
			className: 'a',
			children: [{	
					tag: 'div', 
					children: 'Introduction'
				}, {	
					tag: 'div',
					className: 'b',
					children: [
						fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, 
						fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl,
					]		
				}, {	
					tag: 'div',
					className: 'b',
					children: [
						fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, 
						fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl,
						fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl,
						fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl, fl,				
					]		
				}
			]}, document.body);
		
		
	function addCss(cssRules) {
		var appStyle = document.createElement('style');
		var styleSheet;
		document.head.appendChild(appStyle);
		styleSheet = appStyle.sheet;

		Object.keys(cssRules).forEach(function (selector) {
			var rules = cssRules[selector];
			var rulesStr = '';
			Object.keys(rules).forEach(function(prop) {
				rulesStr += prop + ' : ' + rules[prop] + ';\n';
			});
			styleSheet.insertRule(selector + '{' + rulesStr + '}', styleSheet.cssRules.length);
		});
	}
	
		addCss({
			'html, body': {
				'height': '100%',
				'font': '15px sans-serif',
				'margin': '0px',
			},
			'.a': { 
				'margin': '0px',
				'display': 'flex',
				'height': '100%',
				'flex-direction': 'row', 
			},
			'.b': {
				'display': 'flex',
				'flex-shrink': 0,
				'flex-direction': 'column',
				'overflow': 'auto'
			},
			'.c': {
				'display': 'flex',
				'margin': '2px',
				'flex-direction': 'row',
				'flex-shrink': 0,
				'align-items': 'baseline'
				//['width', '250px']
			},
			'label':{
				'background-color': '#FFAAAA',
				'width': '100px'
			},
			'button': { 
				'border': '4px',
				'background-color': '#CCCCFF',
				'padding': '6px',
				'font': '1em sans-serif',
				'text-align': 'center',
			}
		});
		
		
		
			}
		);
	}
}.call(this));




// {	tag: 'div',
		// className: 'formButton',
		// id: 'button1',
		// children: [
			// { tag: 'label',
				// children: 'Title 1'
			// }, 
			// 'Nooo1',
			// {	tag: textInput,
				
					
				// }
				
			
			// ]
		
			// }}
			
			// console.log(dom);
			
			
		// dom.create
		// dom.add
		// dom.ref
		// dom.remove