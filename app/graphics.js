(function () {
	 
	 //-------- CSS ---------
	
	function addCSSRules (rules) {
		var appStyle = document.createElement('style');
		var styleSheet;
		document.head.appendChild(appStyle); // Append style element to head
		styleSheet = appStyle.sheet; // Grab style sheet

		for (var i = 0, rl = rules.length; i < rl; i++) {
			var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
			// If the second argument of a rule is an array of arrays, correct our variables.
			if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
				rule = rule[1];
				j = 0;
			}
			for (var pl = rule.length; j < pl; j++) {
				var prop = rule[j];
				propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
			}
			// Insert CSS Rule
			styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
		}
	};
	
	var formCSSRules = [
		['#menuSection', 
			['position', 'fixed'],
			['background-color', '#FFFFFF'],
			['height', '70px'],
			['width', '100%'],
		
		],
		['#titleObject', 
			['font', '2em sans-serif'],
			//['width', '320px'],
			//['display', 'inline']
		], 
		
		['#userSection', 
			['position', 'absolute'],
			['right', '20px'],
			['top', '5px'],
			['text-align', 'right']
		],
		['#userInfo', 
			['font', '1em sans-serif'],
		], 
		['.userCreds',
			['margin-top', '5px']
		], 
		['.userButton', 
			['background-color', '#4C50AF'],
			['border', 'none'],
			['color', 'white'],
			['padding', '5px 0px'],
			['width', '173px'],
			['text-align', 'center'],
			['text-decoration', 'none'],
			['font-size', '16px']
		],
		['.formButton', 
			['background-color', '#4C50AF'],
			['border', 'none'],
			['color', 'white'],
			['padding', '5px 10px'],
			['margin-right', '5px'],
			['margin-top', '5px'],
			
			['text-align', 'center'],
			['text-decoration', 'none'],
			['font-size', '16px']
		],
		['.menuLabel',
			['display', 'inline'],
			['width', '200px'],
			['text-align', 'right'],
			['font', '1em sans-serif']
		],
		['#spacer', 
			['height', '100px']
		],
		['#formSection', 
			['position', 'absolute'],
			['right', '15px'],
			['top', '100px'],
			['margin-left', '300px']
		
		],
		['#tableSection', 
			['position', 'absolute'],
			['left', '15px'],
			['top', '100px'],
			['font', '1em sans-serif']
		
		], 
		['.tableHeader', 
			['background-color', '#CCCCFF'],
			['padding', '2px 5px']
		], 
		['.tableRow', 
			['background-color', '#EEEEFF'],
			['padding', '2px 5px']
		],
		['.invalidTableRow', 
			['background-color', '#FFAAAA'],
			['padding', '2px 5px']
		],
		['.headerButton', 
			['border', 'none'],
			['background-color', '#CCCCFF'],
			['padding', '0px 0px'],
			['margin-right', '5px'],
			['margin-top', '5px'],
			['font', '1em sans-serif']
			
			// ['text-align', 'center'],
			// ['text-decoration', 'none'],
			// ['font-size', '16px']
		],
		['.rowButton', 
			['border', 'none'],
			['background-color', '#EEEEFF'],
			['padding', '0px 0px'],
			['margin-right', '5px'],
			['margin-top', '5px'],
			
			// ['text-align', 'center'],
			// ['text-decoration', 'none'],
			// ['font-size', '16px']
		],
		
		['.invalidRowButton', 
			['border', 'none'],
			['background-color', '#FFAAAA'],
			['padding', '0px 0px'],
			['margin-right', '5px'],
			['margin-top', '5px'],
			
			// ['text-align', 'center'],
			// ['text-decoration', 'none'],
			// ['font-size', '16px']
		],
		
		
		['.formDdiv',
			['margin', '0 auto'],
			['margin-top', '100px'],
			['width', '200px'],
			/* To see the outline of the form */
			['padding', '1em'],
			['border', '1px solid #CCC'],
			['border-radius', '1em']
		],
		['.invalidFormItem',
			['width', '410px'],
			['background-color', '#FFAAAA']
			//['font', '1em sans-serif']
		
		],
		['.validFormItem',
			['background-color', '#FFFFFF']
			//['font', '1em sans-serif']
		
		],
		['form div + div', 
			['margin-top', '2px']
		],
		['.formLabel',
			['display', 'inline-block'],
			['width', '200px'],
			['text-align', 'right'],
			['font', '1em sans-serif']
		],
		['input, select, text-area', 
			['margin-left', '10px']
		],
		['.formInput', 
			['font', '1em sans-serif'],
			['width', '200px'],
			['-moz-box-sizing', 'border-box'],
			['box-sizing', 'border-box'],
			['border', '1px solid #999']

		],
		['.textArea', 
			['font', '1em sans-serif'],
			['width', '200px'],
			['-moz-box-sizing', 'border-box'],
			['box-sizing', 'border-box'],
			['margin-left', '10px'],
			['border', '1px solid #999'],
			['resize', 'vertical']

		],
		['.NA', 
			['font', '15px sans-serif'],
			['border', 'none'],
			['background-color', '#AAAAFF']
		], 
		
	];
	
	//-------- Utilities ---------
	
	function createElement(tag, params, parent) {
		var obj = document.createElement(tag);
		var tmp;
		if (params) {
			Object.keys(params).forEach(function (paramName) {
				if (paramName === 'textChild') {
					createTextNode(params[paramName], {}, obj);
				} else if (paramName === 'childrenElements') {
				params[paramName].forEach(function (child) {
					obj.appendChild(child);
				});
			} else {
					obj[paramName] = params[paramName];
				}
			})
		}
		if (parent) {
			parent.appendChild(obj);
		}
		return obj;
	}
	
	function createTextNode(text, className, parent) {
		var obj = document.createTextNode(text);
		if (className) {
			obj.className = className;
		}
		if (parent) {
			parent.appendChild(obj);
		}
		return obj;
	}
	
	//-------- formField ---------
	
	function formField() {
		this.graphicObject = createElement('div', {className: 'invalidFormItem'});
	}
	
	formField.prototype.updateGraphicalValidation = function() {
		this.graphicObject.className = this.validation ? 'validFormItem' : 'invalidFormItem';
	}
	
	//-------- stringFormField ---------
	
	function stringFormField() {
		formField.call(this)
		this.graphicObject = createElement('div', {className: 'invalidFormItem'});
		this.labelObject =  createElement('label', {className: 'formLabel'}, this.graphicObject);
		this.labelTextObject = createTextNode(this.label, false, this.labelObject);
		this.inputField = createElement('input', {
			className: 'formInput',
			onkeyup: () => {this.handleUpdate(); }
			}, this.graphicObject);
	};
	
	stringFormField.prototype = Object.create(formField.prototype);
	stringFormField.prototype.getValue = function () { return this.inputField.value; };
	stringFormField.prototype.setValue = function (val) { 
		this.inputField.value = val; 
		this.handleUpdate();
	};
	
	//-------- dateFormField ---------
	
	function dateFormField() {
		stringFormField.call(this);
		this.inputField.type = 'date';
		this.inputField.onchange = () => {this.handleUpdate(); };
	};
	
	dateFormField.prototype = Object.create(stringFormField.prototype);
	
	//-------- autoStringFormField ---------
	
	function autoStringFormField() {
		stringFormField.call(this);
		this.inputField.readOnly = 'readonly';
	}
	
	autoStringFormField.prototype = Object.create(stringFormField.prototype);
	
	//-------- singleChoiceFormField ---------

	function singleChoiceFormField() {
		var obj = this;
		formField.call(this)
		this.graphicObject = createElement('div', {className: 'invalidFormItem'});
		this.labelObject =  createElement('label', {className: 'formLabel'}, this.graphicObject);
		this.labelTextObject = createTextNode(this.label, false, this.labelObject);
		this.choiceField = createElement('select', {
			className: 'formInput',
			onchange: () => {obj.handleUpdate(); }
			}, this.graphicObject);
		this.choices.forEach(function (choice) {
			choiceObject = createElement('option', {value: choice, text: choice});
			obj.choiceField.add(choiceObject);
		});
		
	};
	
	singleChoiceFormField.prototype = Object.create(formField.prototype);
	singleChoiceFormField.prototype.getValue = function () { return this.choiceField.value; };
	singleChoiceFormField.prototype.setValue = function (val) { 
		this.choiceField.value = val; 
		this.handleUpdate();
	};
	
	// --------- textFormField -----------
	
	function textFormField() {
		formField.call(this)
		this.graphicObject = createElement('div', {className: 'validFormItem'});
		this.labelObject =  createElement('label', {className: 'formLabel'}, this.graphicObject);
		this.labelTextObject = createTextNode(this.label, {}, this.labelObject);
		this.textField = createElement('textarea', {
			className: 'textArea',
			onkeyup: () => {this.handleUpdate(); }
			}, this.graphicObject);
	};
	
	textFormField.prototype = Object.create(formField.prototype);
	textFormField.prototype.getValue = function () { return this.textField.value; };
	textFormField.prototype.setValue = function (val) { 
		this.textField.value = val; 
		this.handleUpdate();
	};
	
	// -------- Form ----------
	
	function form() {
		this.graphicObject = createElement('form', {className: 'formDiv'});
	};
	
	/*
	horizontal container
	vertical container
	table
	text element
	separator
	string input
	text input
	button
	single choice
	multi choice
	*/
	
	_modules.add('graphics', {
		form: form,
		stringFormField: stringFormField,
		autoStringFormField: autoStringFormField,
		dateFormField: dateFormField,
		singleChoiceFormField: singleChoiceFormField,
		textFormField: textFormField,
		addCSSRules: addCSSRules,
		formCSSRules: formCSSRules,
		createElement: createElement,
		createTextNode: createTextNode
		});
	
})();











