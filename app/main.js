

 (function() {
	 
	// console.log(document); scope
	 
	// document.ref = (function () {
		// var scope;
		// return function (name, url) {
			// if (!scope[name]) {
				
			// console.log(name);
			// }
	// }
	
	function newHTML(tag, initProperties, initParent){
		var newObject;
		if (tag == 'text') {
			newObject = document.createTextNode(initProperties);
		} else {
			newObject = document.createElement(tag);
			for (prop in initProperties) {
				newObject[prop] = initProperties[prop];
			}
		}
		if (initParent) {
			initParent.appendChild(newObject);
		}
		return newObject;
	}
	 
	window.onload = function() {

		var heading = newHTML('h1', {}, document.body);
		var heading_text = newHTML('text', '2 Biobanque', heading);
		
		var field1form = newHTML('form', {}, document.body);
		var field2title = newHTML('text', 'Field 1', field1form);
		var field2input = newHTML('input', {}, field1form);
		
		var button = newHTML('button', {
			name: 'NO ACTION',
			type: 'button',
			onclick: function(){
				console.log(field2input.value);
			}
		}, document.body);
		
		var buttonName = newHTML('text', 'NO CLICK', button);
		
		
		console.log('hello');
		console.log(document.scope);
	}
 }.call(this));