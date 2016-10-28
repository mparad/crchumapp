(function () {

	function buildOptions(choices, root){
		choices.forEach(function(choice){
			var obj;
			if (typeof choice !== 'string'){
				obj = document.createElement('optgroup');
				buildOptions(choice, obj);
			} else {
				obj = document.createElement('option');
				textObj = document.createTextNode(choice);
				obj.appendChild(textObj);
			}
			root.appendChild(obj);
		});
	}

	function element(specs) {
		var obj = this;
		//obj.children = [];
		
		switch (specs.tag) {
			case 'select':
				obj.choices = specs.choices;
				obj._dom = document.createElement('select');
				if (specs.mutiple) {
					obj._dom.multiple = true;
				}
				buildOptions(obj.choices, obj._dom);						
				break;
			case 'textDiv': 
				obj.textObj = document.createTextNode(specs.value);
				obj._dom = document.createElement('div');
				obj._dom.className = 'textDiv',
				obj._dom.appendChild(obj.textObj);
				break;
			
			case 'button': 
				obj.textObj = document.createTextNode(specs.value);
				obj._dom = document.createElement('button');
				obj._dom.appendChild(obj.textObj);
				break;
			case 'hdiv':
				obj._dom = document.createElement('div');
				obj._dom.className = 'hdiv';
				break;
			case 'vdiv':
				obj._dom = document.createElement('div');
				obj._dom.className = 'vdiv';
				break;
			default:
				obj._dom = document.createElement(specs.tag);
				break;
		}
		
		obj.tag = specs.tag;
		
		Object.keys(specs).forEach(function (param) {
			switch (param) {
				case 'children':
					specs.children.forEach(function (child) {
						//console.log(obj)
						obj.add(child);
					});
					break;
				case 'style':
					Object.keys(specs.style).forEach(function(styleParam){
						obj._dom.style[styleParam] = specs.style[styleParam];
					});
					break;
				case 'root':
					if (specs.root) {
						document.body.appendChild(obj._dom);
					}
					break;
				default:
					obj._dom[param] = specs[param];
					break;
			}
		});
		
		return obj;
	}
				
	element.prototype.add = function(child) {
		var obj = this;
		var elementChild = (child._dom) ? child : new element(child);
		//obj.children.push(elementChild);
		obj._dom.appendChild(elementChild._dom);
	}
				
	element.prototype.remove = function(child) {
		var obj = this;
		obj._dom.removeChild(child._dom);
	}
				
	element.prototype.replace = function(newChild, oldChild) {
		var obj = this;
		obj._dom.replaceChild(newChild._dom, oldChild._dom);
	}	
				
	element.prototype.children = function() {
		var obj = this;
		return obj._dom.childNodes;
	}
				
	element.prototype.style = function(specs) {
		var obj = this;
		Object.keys(specs).forEach(function(styleParam){
			obj._dom.style[styleParam] = specs[styleParam];
		});
	}
				
	element.prototype.value = function(arg){
		var obj = this;
		var options, noptions, i, optionIndex;
					
		if (arg || arg === '') {
			switch (obj.tag) {
				case 'textDiv':
				case 'button':
					obj.textObj.nodeValue = arg;
					break;
				case 'input':
				case 'textarea':
					if (obj._dom.type === 'checkbox') {
						obj._dom.checked = arg;
					} else {
						obj._dom.value = arg;
					}
					break;
				case 'select':
					noptions = obj._dom.options.length;
					options = new Array(noptions);
					for (i = 0; i < noptions; i++) {
						options[i] = obj._dom.options.item(i).value;
					}
					optionIndex = options.indexOf(arg);
					obj._dom.options.selectedIndex = optionIndex;
					break;
			}
		} else {
			switch (obj.tag) {
				case 'textDiv':
				case 'button':
					return obj.textObj.nodeValue;
					break;
				case 'input':
				case 'textarea':
					if (obj._dom.type === 'checkbox') {
							return obj._dom.checked;
					} else { 
						return obj._dom.value;
					}
					break;
				case 'select':
					return obj._dom.options[obj._dom.selectedIndex].value;
					break;
			}
		}
	}
				
					
	//tagName
	
	var appStyle = document.createElement('style');
	var styleSheet;
	document.head.appendChild(appStyle);
	styleSheet = appStyle.sheet;
					
	function addCss(cssRules) {
		Object.keys(cssRules).forEach(function (selector) {
			var rules = cssRules[selector];
			var rulesStr = '';
			Object.keys(rules).forEach(function(prop) {
				rulesStr += prop + ' : ' + rules[prop] + ';\n';
			});
			styleSheet.insertRule(selector + '{' + rulesStr + '}', styleSheet.cssRules.length);
		});
	}				
					
	_modules.add('html', {
		 element: element,
		 style: addCss
		// root: document.body
	});
				
})();











