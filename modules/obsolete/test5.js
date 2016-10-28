(function() {
	var root = this;
	root.onload = function() {
		_modules.ref(['graphics'], 
			function (gx) {
				
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
			
			
				// if (!formVisible) {
					// formSection.appendChild(formObject.graphicObject);
					// formSection.appendChild(formControls);
					// formVisible = true;
				// }
			// }
			
			// function hideForm() {
				// if (formVisible) {
					// formSection.removeChild(formObject.graphicObject);
					// formSection.removeChild(formControls);
					// formVisible = false;
			
				function treeNode(root, leaves){
					var obj = this;
					obj.leaves = leaves;
					obj.collapsed = true;
					
					rootObj = create({
						tag: 'button',
						onclick: obj.collapse;
					});
					obj.node = create({
						tag: 'div',
						style: {
							display: 'flex',
							'flex-direction': 'row'
						},
						
						
					})
						
					});
					
				}
				
				treeNode.prototype.collapse = function () { 
					var obj = this;
					if (obj.collapsed) {
						obj.leaves.forEach(function (leave) {
							obj.root.appendChild(leave);
						});
					} else {
						obj.leaves.forEach(function (leave) {
							obj.root.removeChild(leave);
						});
					}
					obj.collapsed = !obj.collapsed;
				};
			
				function treeView(tree){
					var obj = this;
					
					
					
				}
				
				
				
		
			}
		);
	}
}.call(this));


/*
create a node 
delete a node
expand
collapse




*/


























