(function() {
	_modules.ref(['graphics'], 
		function (graphics) {
	
			function mixin(protoA, protoB) {
				var proto = Object.create(protoA);
				Object.keys(protoB).forEach(function (key) {
					proto[key] = protoB[key]
				});
				return proto;
			}
	
			function formField(def) {
				var obj = this;
				Object.keys(def).forEach(function(key) {
					obj[key] = def[key];
				});
				this.validation = false;
			}
	
			formField.prototype.handleUpdate = function() {
				var thisField = this;
				if (thisField.validate) {
					thisField.validation = thisField.validate(thisField.getValue());
				} else {
					thisField.validation = true;
				}
				thisField.updateGraphicalValidation();
				if (thisField.targets) {
					thisField.targets.forEach(function (key) {
						targetField = thisField.form.fields[key];
						var newValue = targetField.calculateValue(thisField.form);
						targetField.setValue(newValue);
					});
				}
			}
	
			function stringFormField(def) {
				formField.call(this, def);
				graphics.stringFormField.call(this);
			}
	
			stringFormField.prototype = mixin(
				graphics.stringFormField.prototype, formField.prototype
			);
	
			function dateFormField(def) {
				formField.call(this, def);
				graphics.dateFormField.call(this);
			}
	
			dateFormField.prototype = mixin(
				graphics.dateFormField.prototype, formField.prototype
			);
	
			function autoStringFormField(def) {
				formField.call(this, def);
				graphics.autoStringFormField.call(this);
			}
	
			autoStringFormField.prototype = mixin(
				graphics.autoStringFormField.prototype, formField.prototype
			);
	
			function singleChoiceFormField(def) {
				formField.call(this, def);
				graphics.singleChoiceFormField.call(this);
			}
			
			singleChoiceFormField.prototype = mixin(
				graphics.singleChoiceFormField.prototype, formField.prototype
			);
		
			function textFormField(def) {
				formField.call(this, def);
				graphics.textFormField.call(this);
			}
			
			textFormField.prototype = mixin(
				graphics.textFormField.prototype, formField.prototype
			);
			
			function form(fieldsObject) {
				
				console.log(fieldsObject);
				
				var newForm = this;
				graphics.form.call(newForm);
				newForm.fields = fieldsObject;
				var fieldNames = Object.keys(fieldsObject);
				newForm.fieldsIndex = new Array(fieldNames.length);
				
				fieldNames.forEach(function(fieldName) {
					newForm.fieldsIndex[fieldsObject[fieldName].index] = fieldName;
					fieldsObject[fieldName].form = newForm;
				});
					
				for (i = 0; i < fieldNames.length; i++) {
					var fieldName = newForm.fieldsIndex[i];
					var field = newForm.fields[fieldName];
					newForm.graphicObject.appendChild(field.graphicObject);
				}
				
			}
			
			// clientForm.prototype = {
				// render: function (formParent) {
					// var obj = this;
					
					
				// },
				// load: function () {
					
				// },
				// save: function () {
					
				// }
			// };
			
			_modules.add('form', {
				form: form,
				formField: formField,
				stringFormField: stringFormField,
				dateFormField: dateFormField,
				autoStringFormField: autoStringFormField,
				singleChoiceFormField: singleChoiceFormField,
				textFormField: textFormField
				}
			);
	
		}
	);
	
 }.call(this));
 
 
 
 
 