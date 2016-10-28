/* Asynchronous module loader */

(function() {
	 
	var root = this;
	
	root._modules = (function () {
		var scope = {};
		
		function add(name, obj) {
			var future;
			if (!scope[name]) {
				scope[name] = {
					future: []
				}
			}
			scope[name].func = function (next) {return next(obj); }, 
			future = scope[name].future;
			scope[name].future = [];
			future.forEach(scope[name].func);
		};
		
		function singleRef(name, next) {
			
			var future;
			if (!scope[name]) {
				scope[name] = {
					future: [next]
				}
			} else {
				scope[name].future.push(next)
			}
			
			if (!scope[name].func) {
				scope[name].func = 'loading';
				var script = document.createElement('script');
				script.src = 'modules/' + name + '.js';
				script.async = true;
				document.head.appendChild(script);
			} else if (typeof scope[name].func === 'function'){
				future = scope[name].future;
				scope[name].future = [];
				return future.forEach(scope[name].func);
			}
		};
		
		function ref(modulesNames, next) {
			
			var nModules = modulesNames.length;
			var nModulesLoaded = 0;
			var modulesValues = new Array(nModules);
			if (nModules === 0) {
				next();
			} else {
				for (i = 0; i < nModules; i++ ) {
					(function (j) {
						singleRef(modulesNames[j], function (moduleValue) {
							modulesValues[j] = moduleValue;
							nModulesLoaded++;
							if (nModulesLoaded == nModules) {
								next.apply(null, modulesValues);
							}
						});
					}(i));
				}
			}
		};
		
		return {
			add: add, 
			ref: ref
		};
		
	})();
	 
 }.call(this));
 
 