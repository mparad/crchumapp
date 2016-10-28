(function() {
	var root = this;
	 
	root.onload = function() {
		_modules.ref([
		'graphics'], 
		function (gx) {
			
			//console.log(gx);
			
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
				'.main': { 
					'margin': '0px',
					'display': 'flex',
					'height': '100%',
					'flex-direction': 'column', 
				},
				'.header': {
					'display': 'flex',
					//'padding': '10px', 
					'background-color': '#CCCCFF',
					'flex-shrink': 0,
					'flex-direction': 'column',
					//'overflow': 'auto'
				},
				'.gui': {
					'display': 'flex',
					'flex-shrink': 0,
					'flex-direction': 'row',
					//'height': '100%',
					'overflow': 'auto'
				},
				'.xtable': {
					'display': 'flex',
					'flex-shrink': 0,
					'flex-direction': 'column',
					'min-height': '100%',
					'overflow': 'auto'
				},
				'.tableRow': {
					'display': 'flex',
					'flex-direction': 'row',
					'flex-shrink': 0,
					'align-items': 'baseline'
					//['width', '250px']
				},
				'.scrollhack':{
					'display': 'flex',
					//'width': '10px',
					'background-color': '#EEEEFF',
					'min-height': '100%',
					'margin': '1px'
					
				},
				
				
				'.textXLS': {
					'margin': '5px',
					'background-color': '#EEEEEE',
					'height': '50%',
					'font': '14px monospace',
					'white-space': 'pre',
					//'wrap': 'soft',
					'overflow':'scroll'
				},
				'.colObj': {
					'margin': '5px',
					'background-color': '#EEEEEE',
					'font': '14px monospace'
				},
				'.colch': {
					'margin': '0px',
					'padding': '0px',
					'border': '0px',
					'width': '62px',
					'font': '14px monospace'
				},
				'label':{
					'background-color': '#FFAAAA',
					'width': '100px'
				},
				'button': { 
					'border': 'none',
					'margin-top': '1px',
					'margin-left': '1px',
					
					'background-color': '#CCCCFF',
					'padding': '6px',
					'font': '1em sans-serif',
					'text-align': 'center',
				}
			});
	
			var tableRow = {	
				tag: 'div',
				className: 'tableRow',
				children: [{ 
						tag: 'button', 
						children: 'Name' 
					},
					{ 
						tag: 'button', 
						children: 'Date' 
					},
					{ 
						tag: 'button', 
						children: 'XXXSSSS' 
					},{ 
						tag: 'select', 
						style: {
							//margin: '0px',
							border: 'none',
							padding: '5px',
							'margin-top': '1px',
							'margin-left': '1px',
							'background-color': '#EEEEFF',
							'font': '1em sans-serif',
						},
						children: [{
							tag: 'option',
							children: 'Homo Sapiens'
							}, {
								tag: 'option',
								children: 'Homo Agilis'
							}
						] 
					},
					{ 
						tag: 'button', 
						children: 'Date' 
					},
					{ 
						tag: 'button', 
					}
						children: 'XXXSSSS' 
				]
			};
	
		var lastTimeStamp = 0;
	
		function handleScroll(evt) {
			var ts = evt.timeStamp;
			if (ts - lastTimeStamp > 100) {
					console.log(ta.scrollTop);
					//console.log(ta.font);
					
					lastTimeStamp = ts;
					//ta.scrollTop = 100;
			}
		}
		
		var selon = false;
		
		function handleClick(evt) {
			var ts = evt.timeStamp;
			if (ts - lastTimeStamp > 100) {
					console.log(evt.clientY);
					if (selon) {
						ta.setSelectionRange(0, 100);
					} else {
						ta.setSelectionRange(0, 0);
					}
					selon = !selon;
			}
		}
	
		var to = create({
			tag: 'div',
			children: 'Nothing here!',
			style: {
				font: '1em sans-serif'
			}
			
		});
	
		console.log(to.height);
	
		var colobj = create({
			tag: 'div',
			className: 'colObj', 
			children: [{
				tag: 'select', 
				className: 'colch',
				type: 'select',
				children: [{
					tag: 'option',
					value: 'M',
					text: 'M'
					}, {
					tag: 'option',
					value: 'F',
					text: 'F'
					}]
			}, {
				tag: 'select', 
				className: 'colch',
				type: 'select',
				children: [{
					tag: 'option',
					value: 'M',
					text: 'M'
					}, {
					tag: 'option',
					value: 'Date de naissance',
					text: 'Date de naissance'
					}]
			},{
				tag: 'select', 
				className: 'colch',
				type: 'select',
				children: [{
					tag: 'option',
					value: 'M',
					text: 'M'
					}, {
					tag: 'option',
					value: 'Date de naissance',
					text: 'Date de naissance'
					}]
			},{
				tag: 'select', 
				className: 'colch',
				type: 'select',
				children: [{
					tag: 'option',
					value: 'M',
					text: 'M'
					}, {
					tag: 'option',
					value: 'Date de naissance',
					text: 'Date de naissance'
					}]
			}, {
				tag: 'select', 
				className: 'colch',
				type: 'select',
				children: [{
					tag: 'option',
					value: 'M',
					text: 'M'
					}, {
					tag: 'option',
					value: 'F',
					text: 'F'
					}]
			}, {
				tag: 'select', 
				className: 'colch',
				type: 'select',
				children: [{
					tag: 'option',
					value: 'M',
					text: 'M'
					}, {
					tag: 'option',
					value: 'Date de naissance',
					text: 'Date de naissance'
					}]
			},{
				tag: 'select', 
				className: 'colch',
				type: 'select',
				children: [{
					tag: 'option',
					value: 'M',
					text: 'M'
					}, {
					tag: 'option',
					value: 'Date de naissance',
					text: 'Date de naissance'
					}]
			},{
				tag: 'select', 
				className: 'colch',
				type: 'select',
				children: [{
					tag: 'option',
					value: 'M',
					text: 'M'
					}, {
					tag: 'option',
					value: 'Date de naissance',
					text: 'Date de naissance'
					}]
			}]
			
		});
	
		var bigString = (new Array(10000)).fill('\n').join('');
	
		var ta = create({
					tag: 'textarea',
					//wrap: 'soft',
					className: 'textXLS',
					readOnly: true,
					onscroll: handleScroll,
					onclick: handleClick,
					children: 'AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAA  AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAA AAAAAAAAAAAAAA\nB\nC\nD\nE\nF\nG\nH\n' + 
					'\n\n\n\n\n\n\n\n\n' + 
					'2001/20/12\n' + 
					'2010/34/22\n' +
					'\n\n\n\n\n\n\n\n\n\n\n' +
					'----------------------------' +
					'\n\n\n\n\n\n\n\n\n' +
					'A\nB\nC\nD\nE\nF\nG\nH\n' + bigString
				});
	
	console.log(ta.tag);
		var tp = 1;
		var hh = create({
				tag: 'div', 
				className: 'header',
				style: {
					font: '25px sans-serif',
					padding: '0px'
				},
				children: 'HEADER'
			}
		)
	
		var main = create(
		{ 
			tag: 'div', 
			className: 'main',
			children: [
					hh,
					{	
					tag: 'div',
					className: 'gui',
					children: [{
							tag: 'div',
							className: 'toolbar',
							children: 'TOOLBAR'
						}, {
							tag: 'div',
							className: 'xtable',
							children: [tableRow, tableRow, tableRow, tableRow, 
								tableRow, tableRow, tableRow, tableRow, 
								tableRow, tableRow,tableRow, tableRow
							]
						},
						{
							tag: 'div',
							className: 'scrollhack',
							onwheel: function() {
								hh.style.padding = (tp + 1) + 'px';
								tp += 1;
								console.log(hh.style.padding);
							},
							style: {
								'background-color':'#BBBBFF',
								width: '20px', 
								height: '200px',
								display: 'flex',
								'flex-direction': 'row',
							},
							children: [{
								tag: 'div',
								className: 'scrollcursor',
								style: {
									margin: '1px',
									width: '18px', 
									height: '20px',
									'background-color':'#EEEEFF'
									},
							}]
						}
					]
				},
				//colobj,
				//ta
			]
		}, 
		document.body);
		
		// var main = create(
		// {	
					// tag: 'div',
					// className: 'gui',
					// children: [{
							// tag: 'div',
							// className: 'toolbar',
							// children: 'TOOLBAR'
						// }, {
							// tag: 'div',
							// className: 'xtable',
							// children: [tableRow, tableRow, tableRow, tableRow, tableRow, tableRow, tableRow, tableRow, tableRow, tableRow,tableRow, tableRow]
						// },
						// // {
							// // tag: 'div',
							// // className: 'toolbar',
							// // children: [{
							// // tag: 'input',
							// // className: 'toolbar',
							// // type: 'range',
							// // label: 'TOOLBAR'
						// // }]
						// // }
					// ]
				// }, 
		// document.body);
	
	
		
		
		
		
			}
		);
	}
}.call(this));

